import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/admin/auth/login", { email, password });
      login(res.data.token);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>Admin Portal</h2>
          <p style={subtitleStyle}>Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <p style={errorStyle}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...buttonStyle,
              backgroundColor: loading ? "#475569" : "#3b82f6",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <footer style={footerStyle}>
          © 1978 HFDI
        </footer>
      </div>
    </div>
  );
}

// ===== Styles =====

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#0f172a",
  fontFamily: "'Segoe UI', Tahoma, sans-serif",
};

const cardStyle = {
  width: "320px",
  backgroundColor: "#1e293b",
  padding: "30px 25px",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  textAlign: "center",
};

const headerStyle = {
  marginBottom: "25px",
};

const titleStyle = {
  margin: "0 0 8px 0",
  color: "#e2e8f0",
};

const subtitleStyle = {
  margin: 0,
  color: "#94a3b8",
  fontSize: "13px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  textAlign: "left",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle = {
  fontSize: "13px",
  color: "#cbd5e1",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #334155",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#0f172a",
  color: "#f1f5f9",
};

const buttonStyle = {
  padding: "11px",
  borderRadius: "6px",
  border: "none",
  color: "white",
  fontSize: "14px",
  fontWeight: "600",
  marginTop: "10px",
};

const errorStyle = {
  color: "#f87171",
  fontSize: "13px",
  textAlign: "center",
};

const footerStyle = {
  marginTop: "25px",
  fontSize: "11px",
  color: "#64748b",
};