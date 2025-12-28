import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const login = async () => {
    setMsg("");

    if (!email || !password) {
      setMsg("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setMsg("Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else if (res.data.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      
      <Navbar />

      
      <div className="auth-container">
        <h2>Sign In</h2>

        {msg && <div className="error">{msg}</div>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Sign In</button>

        
        <button
          style={{
            marginTop: "10px",
            background: "#e5e7eb",
            color: "#111827"
          }}
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
