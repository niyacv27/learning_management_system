import { useEffect, useState } from "react";
import api from "../services/api";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  
  const [records, setRecords] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/teacher/courses");
    setCourses(res.data);
  };

  const viewStudents = async (courseId) => {
    const res = await api.get(`/teacher/students/${courseId}`);
    setSelectedCourse(courseId);
    setStudents(res.data);
  };

  const saveRecord = async (studentId) => {
    const data = records[studentId];

    if (!data?.attendance || !data?.marks) {
      alert("Enter attendance and marks");
      return;
    }

    await api.post("/attendance/add", {
      courseId: selectedCourse,
      studentId,
      attendance: data.attendance,
      marks: data.marks
    });

    alert("Saved successfully");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

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
          padding: "0 30px",
          fontSize: "25px",
          fontWeight: "bold"
        }}
      >
        <span>Learning Management System</span>
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

      
      <div style={{ padding: "20px" }}>
        <h2>Teacher Dashboard</h2>

        
        <h3>My Courses</h3>
        {courses.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px"
            }}
          >
            <b>{c.title}</b>
            <br />
            <button
              onClick={() => viewStudents(c._id)}
              style={{
                marginTop: "6px",
                width: "160px",
                padding: "6px",
                fontSize: "13px",
                color: "#5146b0ff",
                fontweight: "bold"

              }}
            >
              View Enrolled Students
            </button>
          </div>
        ))}

        
        {selectedCourse && (
          <>
            <h3>Enrolled Students</h3>

            {students.length === 0 ? (
              <p>No students enrolled</p>
            ) : (
              <table
                border="1"
                cellPadding="8"
                cellSpacing="0"
                width="100%"
                style={{ background: "white", tableLayout: "fixed" }}
              >
                <thead style={{ background: "#e5e7eb" }}>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Attendance (%)</th>
                    <th>Marks</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.email}</td>

                     
                      <td>
                        <input
                          type="number"
                          style={{
                            width: "100%",
                            padding: "4px",
                            margin: "0",
                            boxSizing: "border-box"
                          }}
                          value={records[s._id]?.attendance || ""}
                          onChange={(e) =>
                            setRecords({
                              ...records,
                              [s._id]: {
                                ...records[s._id],
                                attendance: e.target.value
                              }
                            })
                          }
                        />
                      </td>

                      
                      <td>
                        <input
                          type="number"
                          style={{
                            width: "100%",
                            padding: "4px",
                            margin: "0",
                            boxSizing: "border-box"
                          }}
                          value={records[s._id]?.marks || ""}
                          onChange={(e) =>
                            setRecords({
                              ...records,
                              [s._id]: {
                                ...records[s._id],
                                marks: e.target.value
                              }
                            })
                          }
                        />
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => saveRecord(s._id)}
                          style={{
                            width: "70px",
                            padding: "5px",
                            fontSize: "13px",
                            color: "#0d54e2ff"
                          }}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
}
