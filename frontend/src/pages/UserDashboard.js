import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [view, setView] = useState("courses");

  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    fetchData();
    fetchAttendance();
  }, []);

  
  const fetchData = async () => {
    try {
      const userRes = await api.get("/user/me");
      const courseRes = await api.get("/courses");
      const enrollRes = await api.get("/enrollments/my");

      setUser(userRes.data);
      setProfileForm({
        name: userRes.data.name,
        email: userRes.data.email
      });
      setCourses(courseRes.data);
      setEnrollments(enrollRes.data);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/attendance/my");
      setRecords(res.data);
    } catch {
      toast.error("Failed to load attendance");
    }
  };

  
  const enroll = async (courseId) => {
    try {
      await api.post("/enrollments", { courseId });
      toast.success("Enrollment request sent");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Already enrolled or pending");
    }
  };

  
  const getEnrollmentStatus = (courseId) => {
    const e = enrollments.find(
      (en) => en.course && en.course._id === courseId
    );
    return e ? e.status : null;
  };

  
  const saveProfile = async () => {
    if (!profileForm.name || !profileForm.email) {
      toast.error("Name and Email are required");
      return;
    }

    try {
      await api.put("/user/me", profileForm);
      toast.success("Profile updated successfully");
      setEditProfile(false);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  if (!user) return null;

  return (
    <>
      
      <div
        style={{
          height: "60px",
          background: "#2563eb",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 30px"
        }}
      >
        <b>Learning Management System</b>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span onClick={() => setView("courses")} style={{ cursor: "pointer" }}>
            Home
          </span>
          <span onClick={() => setView("profile")} style={{ cursor: "pointer" }}>
            Profile
          </span>
          <span onClick={() => setView("enrolled")} style={{ cursor: "pointer" }}>
            Enrolled Courses
          </span>
          <span onClick={() => setView("marks")} style={{ cursor: "pointer" }}>
            Attendance & Marks
          </span>

          <button
            onClick={logout}
            style={{
              width: "80px",
              padding: "6px",
              fontSize: "12px",
              background: "#f0eaea",
              color: "#2563eb",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      
      <div style={{ padding: "20px" }}>
        
        {view === "courses" && (
          <>
            <h2>All Courses</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px"
              }}
            >
              {courses.map((c) => {
                const status = getEnrollmentStatus(c._id);

                return (
                  <div
                    key={c._id}
                    style={{
                      background: "white",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc"
                    }}
                  >
                    <h4>{c.title}</h4>
                    <p><b>Description:</b> {c.description}</p>
                    <p><b>Features:</b> {c.features}</p>
                    <p><b>Duration:</b> {c.duration}</p>
                    <p><b>Teacher:</b> {c.teacher?.name}</p>

                    <br />

                    {status ? (
                      <span className={`status-btn ${status}`}>
                        {status.toUpperCase()}
                      </span>
                    ) : (
                      <button
                        className="enroll-btn"
                        onClick={() => enroll(c._id)}
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        
        {view === "profile" && (
          <>
            <h2>My Profile</h2>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                maxWidth: "400px"
              }}
            >
              <label>Name</label>
              <input
                value={profileForm.name}
                disabled={!editProfile}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
              />

              <label>Email</label>
              <input
                value={profileForm.email}
                disabled={!editProfile}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, email: e.target.value })
                }
              />

              <br />

              {!editProfile ? (
                <button
                  className="enroll-btn"
                  onClick={() => setEditProfile(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button className="enroll-btn" onClick={saveProfile}>
                    Save Changes
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      setEditProfile(false);
                      setProfileForm({
                        name: user.name,
                        email: user.email
                      });
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </>
        )}

        
        {view === "enrolled" && (
          <>
            <h2>My Enrolled Courses</h2>

            {enrollments
              .filter((e) => e.course)
              .map((e) => (
                <div
                  key={e._id}
                  style={{
                    background: "white",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
                >
                  <h4>{e.course.title}</h4>
                  <span className={`status-btn ${e.status}`}>
                    {e.status.toUpperCase()}
                  </span>
                </div>
              ))}
          </>
        )}

        
        {view === "marks" && (
          <>
            <h2>Attendance & Marks</h2>

            {records
              .filter(
                (r) =>
                  r.course &&
                  enrollments.some(
                    (e) =>
                      e.course &&
                      r.course._id === e.course._id &&
                      (e.status === "approved" || e.status === "completed")
                  )
              )
              .map((r) => (
                <div
                  key={r._id}
                  style={{
                    background: "white",
                    padding: "15px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc"
                  }}
                >
                  <p><b>Course:</b> {r.course.title}</p>
                  <p><b>Attendance:</b> {r.attendance}%</p>
                  <p><b>Marks:</b> {r.marks}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
}
