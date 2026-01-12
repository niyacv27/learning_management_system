import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";   
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const register = async () => {
    
    if (!form.name || !form.email || !form.password) {
      toast.warning("All fields are required");
      return;
    }

    if (form.name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (!validateEmail(form.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (form.password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      await api.post("/auth/register", form);

      toast.success("Registered successfully. Please login."); 

      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      ); 
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <h2>Sign Up (Student)</h2>

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={register}>Sign Up</button>

        <button
          className="switch-btn"
          onClick={() => (window.location = "/login")}
        >
          Back to Sign In
        </button>
      </div>
    </>
  );
}
