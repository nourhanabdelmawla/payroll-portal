import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const [slip, setSlip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlip = async () => {
      try {
        const token = localStorage.getItem("employeeToken");

        const res = await axios.get(
          "http://localhost:3000/api/employees/salary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setSlip(res.data.data);
      } catch (err) {
        console.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchSlip();
  }, []);

  if (loading) return <p style={loadingText}>Loading...</p>;
  if (!slip) return <p style={loadingText}>No salary slip available.</p>;

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Welcome</h2>

        <p style={subtitle}>
          Helwan Factory for Developed Industry
        </p>

        <div style={infoBox}>
          <p><strong>Month:</strong> {slip.month}</p>
          <p>
            <strong>Uploaded At:</strong>{" "}
            {new Date(slip.uploadedAt).toLocaleDateString()}
          </p>
        </div>

        <button
          style={button}
          onClick={() =>
            window.open(
              `http://localhost:3000/api/salary/file/${slip._id}`,
              "_self"
            )
          }
        >
          View Salary Slip (PDF)
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

// ===== Styles =====

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#0f172a",
};

const card = {
  width: "320px",
  backgroundColor: "#1e293b",
  padding: "30px",
  borderRadius: "10px",
  textAlign: "center",
};

const title = {
  color: "#e2e8f0",
};

const subtitle = {
  color: "#94a3b8",
  marginBottom: "20px",
};

const infoBox = {
  backgroundColor: "#0f172a",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px",
  color: "#e2e8f0",
  textAlign: "left",
};

const button = {
  padding: "10px",
  width: "100%",
  backgroundColor: "#3b82f6",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
};

const loadingText = {
  color: "#e2e8f0",
  textAlign: "center",
  marginTop: "50px",
};