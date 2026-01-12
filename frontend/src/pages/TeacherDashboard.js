import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [records, setRecords] = useState({});
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/teacher/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await api.get("/enrollments/teacher");
      setEnrollments(res.data);
    } catch {
      toast.error("Failed to load enrollments");
    }
  };

  const viewStudents = async (courseId) => {
    try {
      const res = await api.get(`/teacher/students/${courseId}`);
      setSelectedCourse(courseId);
      setStudents(res.data);
    } catch {
      toast.error("Failed to load students");
    }
  };

  const saveRecord = async (studentId) => {
    const data = records[studentId];
    if (!data?.attendance || !data?.marks) {
      toast.error("Enter attendance and marks");
      return;
    }

    await api.post("/attendance/add", {
      courseId: selectedCourse,
      studentId,
      attendance: data.attendance,
      marks: data.marks
    });

    toast.success("Attendance saved");
  };

  const markCompleted = async (studentId) => {
    const enrollment = enrollments.find(
      (e) =>
        e.student._id === studentId &&
        e.course._id === selectedCourse
    );

    if (!enrollment) {
      toast.error("Enrollment not found");
      return;
    }

    await api.put(`/enrollments/${enrollment._id}/status`, {
      status: "completed"
    });

    toast.success("Course marked completed");
    fetchEnrollments();
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
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        Teacher Dashboard
        <button className="teacher-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        <h3>My Courses</h3>

        {courses.map((c) => (
          <div key={c._id} style={{ marginBottom: "10px" }}>
            <b>{c.title}</b>
            <br />
            <button
              className="teacher-view-btn"
              onClick={() => viewStudents(c._id)}
            >
              View Students
            </button>
          </div>
        ))}

        {selectedCourse && (
          <>
            <h3>Approved Students</h3>

            {students.map((s) => (
              <div key={s._id} style={{ marginBottom: "12px" }}>
                <b>{s.name}</b> ({s.email})
                <br />

                <input
                  placeholder="Attendance"
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

                <input
                  placeholder="Marks"
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

                <button
                  className="teacher-save-btn"
                  onClick={() => saveRecord(s._id)}
                >
                  Save
                </button>

                <button
                  className="teacher-complete-btn"
                  onClick={() => markCompleted(s._id)}
                >
                  Completed
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
