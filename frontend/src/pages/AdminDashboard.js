import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [view, setView] = useState("all");

  const [courseForm, setCourseForm] = useState({
    title: "",
    duration: "",
    description: "",
    teacher: ""
  });

  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  const fetchTeachers = async () => {
    const res = await api.get("/admin/teachers");
    setTeachers(res.data);
  };

  const fetchEnrollments = async () => {
    const res = await api.get("/enrollments");
    setEnrollments(res.data.filter(e => e.status === "pending"));
  };

  
  const addTeacher = async () => {
    const { name, email, password } = teacherForm;

    if (!name || !email || !password) {
      toast.error("All fields required");
      return;
    }

    await api.post("/admin/add-teacher", teacherForm);
    toast.success("Teacher added");

    setTeacherForm({ name: "", email: "", password: "" });
    fetchTeachers();
  };

  
  const submitCourse = async () => {
    const { title, duration, teacher } = courseForm;

    if (!title || !duration || !teacher) {
      toast.error("All fields required");
      return;
    }

    if (editId) {
      await api.put(`/courses/${editId}`, courseForm);
      toast.success("Course updated");
      setEditId(null);
    } else {
      await api.post("/courses", courseForm);
      toast.success("Course added");
    }

    setCourseForm({
      title: "",
      duration: "",
      description: "",
      teacher: ""
    });

    fetchCourses();
    setView("all");
  };

  const editCourse = (c) => {
    setEditId(c._id);
    setCourseForm({
      title: c.title,
      duration: c.duration,
      description: c.description,
      teacher: c.teacher?._id
    });
    setView("course");
  };

  const deleteCourse = async (id) => {
    await api.delete(`/courses/${id}`);
    toast.warning("Course deleted");
    fetchCourses();
  };

  
  const approve = async (id) => {
    await api.put(`/enrollments/${id}/status`, { status: "approved" });
    toast.success("Enrollment approved");
    fetchEnrollments();
  };

  const reject = async (id) => {
    await api.put(`/enrollments/${id}/status`, { status: "rejected" });
    toast.warning("Enrollment rejected");
    fetchEnrollments();
  };

  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="admin-action-btn" onClick={() => setView("teacher")}>
            Add Teacher
          </button>
          <button className="admin-action-btn" onClick={() => setView("course")}>
            Add Course
          </button>
          <button className="admin-action-btn" onClick={() => setView("all")}>
            All Courses
          </button>
          <button className="admin-action-btn" onClick={() => setView("enroll")}>
            Enrollment Requests
          </button>
        </div>

        <hr />

        
        {view === "teacher" && (
          <div className="admin-form-container">
            <h3>Add Teacher</h3>

            <input
              placeholder="Name"
              value={teacherForm.name}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={teacherForm.email}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={teacherForm.password}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, password: e.target.value })
              }
            />

            <button
              className="form-submit-btn teacher-btn"
              onClick={addTeacher}
            >
              Add Teacher
            </button>
          </div>
        )}

        
        {view === "course" && (
          <div className="admin-form-container">
            <h3>{editId ? "Edit Course" : "Add Course"}</h3>

            <input
              placeholder="Title"
              value={courseForm.title}
              onChange={(e) =>
                setCourseForm({ ...courseForm, title: e.target.value })
              }
            />

            <input
              placeholder="Duration"
              value={courseForm.duration}
              onChange={(e) =>
                setCourseForm({ ...courseForm, duration: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={courseForm.description}
              onChange={(e) =>
                setCourseForm({ ...courseForm, description: e.target.value })
              }
            />

            <select
              value={courseForm.teacher}
              onChange={(e) =>
                setCourseForm({ ...courseForm, teacher: e.target.value })
              }
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button
              className="form-submit-btn course-btn"
              onClick={submitCourse}
            >
              {editId ? "Update Course" : "Add Course"}
            </button>
          </div>
        )}

        
        {view === "enroll" && (
          <>
            <h3>Enrollment Requests</h3>

            {enrollments.map((e) => (
              <div
                key={e._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px"
                }}
              >
                <p><b>Student:</b> {e.student.name}</p>
                <p><b>Course:</b> {e.course.title}</p>

                <button
                  className="status-btn approve"
                  onClick={() => approve(e._id)}
                >
                  Approve
                </button>

                <button
                  className="status-btn reject"
                  onClick={() => reject(e._id)}
                >
                  Reject
                </button>
              </div>
            ))}
          </>
        )}

        
        {view === "all" && (
          <>
            <h3>All Courses</h3>

            <table border="1" cellPadding="8" width="100%">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.duration}</td>
                    <td>{c.description}</td>
                    <td>{c.teacher?.name}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editCourse(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteCourse(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
