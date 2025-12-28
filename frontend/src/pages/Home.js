import "../App.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Learning Management System</h1>

      <p className="tagline">
        Learn • Manage • Grow
      </p>

      <div className="home-buttons">
        <button onClick={() => window.location = "/login"}>
          Sign In
        </button>

        
        <button onClick={() => window.location = "/register"}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
