import { useState } from "react";
import api from "../services/api";

export default function UploadSalaries() {
  const [bulkFile, setBulkFile] = useState(null);
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleBulkUpload = async () => {
    if (!bulkFile) return setMessage({ text: "⚠️ Please choose a ZIP file first", type: "error" });

    setLoading(true);
    setMessage({ text: "🚀 Uploading and processing salaries...", type: "info" });

    try {
      const formData = new FormData();
      formData.append("zip", bulkFile); 
      formData.append("month", month); 
      formData.append("year", year);   

      const res = await api.post("/admin/salaries/upload-zip", formData);
      setMessage({ text: `✅ ${res.data.message}`, type: "success" });
      setBulkFile(null);
    } catch (error) {
      setMessage({ 
        text: `❌ ${error.response?.data?.message || "Upload failed"}`, 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ color: "#1e293b", margin: 0 }}>💰 Upload Salaries </h2>
        
      </div>

      <div style={cardStyle}>
        <div style={formGridStyle}>
          {/* select month*/}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Select Month</label>
            <select style={selectStyle} value={month} onChange={(e) => setMonth(e.target.value)}>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* year*/}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Year</label>
            <input 
              style={inputStyle}
              type="number" 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
            />
          </div>
        </div>

        <div style={fileUploadAreaStyle}>
          <label style={labelStyle}>Salary ZIP File</label>
          <div style={{ marginTop: '10px' }}>
            <input
              type="file"
              accept=".zip"
              onChange={(e) => setBulkFile(e.target.files[0])}
              disabled={loading}
            />
          </div>
          {bulkFile && (
            <p style={{ fontSize: '13px', color: '#2563eb', marginTop: '10px', fontWeight: '500' }}>
              Selected: {bulkFile.name}
            </p>
          )}
        </div>

        <button 
          onClick={handleBulkUpload} 
          disabled={loading || !bulkFile}
          style={{ 
            ...buttonStyle, 
            backgroundColor: loading ? "#94a3b8" : "#2563eb",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Uploading..." : "Upload & Process"}
        </button>

        {message.text && (
          <div style={{ 
            ...messageStyle, 
            backgroundColor: message.type === 'success' ? '#f0fdf4' : 
                             message.type === 'info' ? '#eff6ff' : '#fef2f2',
            color: message.type === 'success' ? '#166534' : 
                   message.type === 'info' ? '#1e40af' : '#991b1b',
            borderColor: message.type === 'success' ? '#bbf7d0' : 
                         message.type === 'info' ? '#bfdbfe' : '#fecaca'
          }}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Styles (Clean Light Mode) ---

const containerStyle = {
  maxWidth: "700px",
  margin: "0 auto",
};

const headerStyle = {
  marginBottom: "25px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
  border: "1px solid #e2e8f0",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "30px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#475569",
};

const selectStyle = {
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: "#f8fafc",
  color: "#1e293b",
  border: "1px solid #cbd5e1",
  outline: "none",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  backgroundColor: "#f8fafc",
  color: "#1e293b",
  border: "1px solid #cbd5e1",
  outline: "none",
};

const fileUploadAreaStyle = {
  backgroundColor: "#f1f5f9",
  padding: "25px",
  borderRadius: "8px",
  border: "2px dashed #cbd5e1",
  marginBottom: "30px",
  textAlign: "center",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "none",
  color: "#fff",
  fontSize: "15px",
  fontWeight: "600",
  transition: "background 0.2s ease",
};

const messageStyle = {
  marginTop: "20px",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid",
  fontSize: "14px",
  textAlign: "center",
};