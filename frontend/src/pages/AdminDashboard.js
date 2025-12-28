import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  const [view, setView] = useState(""); 

  
  const [form, setForm] = useState({
    title: "",
    duration: "",
    features: "",
    description: "",
    teacher: ""
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [editId, setEditId] = useState(null);

  
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: "",
    image: null
  });

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  const fetchTeachers = async () => {
    const res = await api.get("/admin/teachers");
    setTeachers(res.data);
  };

  
  const submitCourse = async () => {
    const { title, duration, teacher } = form;

    if (!title || !duration || !teacher) {
      alert("Title, Duration & Teacher are required");
      return;
    }

    if (editId) {
      await api.put(`/courses/${editId}`, form);
      setEditId(null);
    } else {
      await api.post("/courses", form);
    }

    setForm({
      title: "",
      duration: "",
      features: "",
      description: "",
      teacher: ""
    });

    fetchCourses();
    setView("all");
  };

  const editCourse = (course) => {
    setEditId(course._id);
    setForm({
      title: course.title,
      duration: course.duration,
      features: course.features,
      description: course.description,
      teacher: course.teacher?._id || ""
    });
    setView("course");
  };

  const deleteCourse = async (id) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  
  const addTeacher = async () => {
    const { name, email, password, image } = teacherForm;

    if (!name || !email || !password) {
      alert("All teacher fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) formData.append("image", image);

    await api.post("/admin/add-teacher", formData);

    alert("Teacher added successfully");
    setTeacherForm({ name: "", email: "", password: "", image: null });
    fetchTeachers();
  };

 
  const formBoxStyle = {
    maxWidth: "600px",
    marginTop: "20px"
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "12px"
  };

  
  return (
    <>
      <AdminNavbar />

      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>

        
        <div style={{ display: "flex", gap: "15px", maxWidth: "600px" }}>
          <button className="admin-action-btn" onClick={() => setView("teacher")}>Add Teacher</button>
          <button className="admin-action-btn" onClick={() => setView("course")}>Add Course</button>
          <button className="admin-action-btn" onClick={() => setView("all")}>All Courses</button>

        </div>

        <hr />

      
        {view === "teacher" && (
          <div style={formBoxStyle}>
            <h3>Add Teacher</h3>

            <input
              style={inputStyle}
              placeholder="Teacher Name"
              value={teacherForm.name}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, name: e.target.value })
              }
            />

            <input
              style={inputStyle}
              placeholder="Teacher Email"
              value={teacherForm.email}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, email: e.target.value })
              }
            />

            <input
              style={inputStyle}
              type="password"
              placeholder="Password"
              value={teacherForm.password}
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, password: e.target.value })
              }
            />

            <input
              style={inputStyle}
              type="file"
              accept="image/*"
              onChange={(e) =>
                setTeacherForm({ ...teacherForm, image: e.target.files[0] })
              }
            />

            <button className="form-submit-btn" onClick={addTeacher}>
               Add Teacher
            </button>

          </div>
        )}

        
        {view === "course" && (
          <div style={formBoxStyle}>
            <h3>{editId ? "Edit Course" : "Add Course"}</h3>

            <input
              style={inputStyle}
              placeholder="Course Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              style={inputStyle}
              placeholder="Duration"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />

            <input
              style={inputStyle}
              placeholder="Features"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
            />

            <textarea
              style={inputStyle}
              rows={4}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <select
              style={inputStyle}
              value={form.teacher}
              onChange={(e) => setForm({ ...form, teacher: e.target.value })}
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

            <button className="form-submit-btn" onClick={submitCourse}>
               {editId ? "Update Course" : "Add Course"}
            </button>

          </div>
        )}

       
        {view === "all" && (
          <>
            <h3>All Courses</h3>

            <table
              border="1"
              cellPadding="8"
              cellSpacing="0"
              width="100%"
              style={{ background: "white", tableLayout: "fixed" }}
            >
              <thead style={{ background: "#e5e7eb" }}>
                <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Description</th>
                  <th>Teacher</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.duration}</td>
                    <td style={{ wordWrap: "break-word" }}>
                      {c.description}
                    </td>
                    <td>{c.teacher?.name}</td>
                    <td style={{ textAlign: "center" }}>
                      {c.teacher?.image && (
                        <img
                          src={`http://localhost:5000/uploads/${c.teacher.image}`}
                          alt="Teacher"
                          width="70"
                          height="70"
                          style={{ borderRadius: "50%" }}
                        />
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => editCourse(c)}
                        style={{
                          width: "65px",
                          padding: "4px",
                          fontSize: "12px",
                          marginRight: "5px",
                          background: "#a9c171ff",
                           color: "#0f0f0fde"
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCourse(c._id)}
                        style={{
                          width: "65px",
                          padding: "4px",
                          fontSize: "12px",
                          color: "#0f0f0fde",
                          background: "#e75353ff"
                        }}
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
