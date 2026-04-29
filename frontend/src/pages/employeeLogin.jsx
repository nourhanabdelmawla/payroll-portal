import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/employees/login", { 
        employeeId, 
        password 
      });

      if (res.data.ok) {
        localStorage.setItem("employeeToken", res.data.token);
        navigate("/employee-dashboard");
      }
    } catch (err) {
      setError("Invalid Employee ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form onSubmit={handleLogin} style={card}>
        
        <h2 style={title}>Welcome</h2>
        <p style={subtitle}>
          Helwan Factory for Developed Industry
        </p>

        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
          required
        />

        {error && <p style={errorText}>{error}</p>}

        <button type="submit" style={button} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default EmployeeLogin;

// ===== Styles =====

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0f172a",
  fontFamily: "sans-serif",
};

const card = {
  width: "300px",
  padding: "30px 25px",
  backgroundColor: "#1e293b",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  textAlign: "center",
};

const title = {
  color: "#e2e8f0",
  margin: 0,
};

const subtitle = {
  color: "#94a3b8",
  fontSize: "13px",
  marginBottom: "10px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #334155",
  backgroundColor: "#0f172a",
  color: "#f1f5f9",
  outline: "none",
};

const button = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const errorText = {
  color: "#f87171",
  fontSize: "13px",
};