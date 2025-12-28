import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);

  const [view, setView] = useState("courses"); 

  useEffect(() => {
    fetchData();
    fetchAttendance();
  }, []);

  const fetchData = async () => {
    const userRes = await api.get("/user/me");
    const courseRes = await api.get("/courses");

    setUser(userRes.data);
    setCourses(courseRes.data);
  };

  const fetchAttendance = async () => {
    const res = await api.get("/attendance/my");
    setRecords(res.data);
  };

  const enroll = async (id) => {
    await api.post(`/user/enroll/${id}`);
    fetchData();
    fetchAttendance();
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
          <span style={{ cursor: "pointer" }} onClick={() => setView("courses")}>
            Home
          </span>

          <span style={{ cursor: "pointer" }} onClick={() => setView("profile")}>
            Profile
          </span>

          <span style={{ cursor: "pointer" }} onClick={() => setView("enrolled")}>
            Enrolled Courses
          </span>

          <span style={{ cursor: "pointer" }} onClick={() => setView("marks")}>
            Attendance & Marks
          </span>

          <button
            onClick={logout}
            style={{
              width: "80px",
              padding: "6px",
              fontSize: "12px",
              background: "#f0eaeaff",
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
              {courses.map((c) => (
                <div
                  key={c._id}
                  style={{
                    background: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    maxWidth: "600px"     
                    
                  }}
                >
                  <h4>{c.title}</h4>

                  <p><b>Description:</b> {c.description}</p>
                  <p><b>Features:</b> {c.features}</p>
                  <p><b>Duration:</b> {c.duration}</p>

                  <p><b>Teacher:</b> {c.teacher?.name}</p>

                  {c.teacher?.image && (
                    <img
                      src={`http://localhost:5000/uploads/${c.teacher.image}`}
                      alt="Teacher"
                      width="80"
                      style={{ borderRadius: "50%" }}
                    />
                  )}

                  <br /><br />

                  <button
                    onClick={() => enroll(c._id)}
                    style={{ fontWeight: "bold", color: "#2563eb" }}
                  >
                     Enroll
                 </button>

                </div>
              ))}
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
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
            </div>
          </>
        )}

        
        {view === "enrolled" && (
          <>
            <h2>My Enrolled Courses</h2>

            {user.enrolledCourses?.map((c) => (
              <div
                key={c._id}
                style={{
                  background: "white",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
              >
                <h4>{c.title}</h4>
                <p><b>Description:</b> {c.description}</p>
                <p><b>Duration:</b> {c.duration}</p>
              </div>
            ))}
          </>
        )}

       
        {view === "marks" && (
          <>
            <h2>Attendance & Marks</h2>

            {records.length === 0 && <p>No records available</p>}

            {records.map((r) => (
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
                <p><b>Teacher:</b> {r.teacher.name}</p>
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
