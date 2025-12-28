import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
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
      <h3 style={{ margin: 0 }}>Learning Management System</h3>

      <button
        onClick={logout}
        style={{
          background: "white",
          color: "#2563eb",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          width: "auto"
        }}
      >
        Logout
      </button>
    </div>
  );
}
