// import { useState } from "react";
// import api from "../services/api";

// function UploadEmployees() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage(" choose a file please");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await api.post(
//         "/employees/bulk",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" }
//         }
//       );
//       setMessage(res.data.message );
//     } catch (err) {
//       setMessage(
//         err.response?.data?.message 
//       );
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Upload Employees</h2>

//       <input
//         type="file"
//         accept=".csv,.xlsx"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <br /><br />

//       <button onClick={handleUpload}>
//         Upload
//       </button>

//       <p>{message}</p>
//     </div>
//   );
// }

// export default UploadEmployees;

import { useState } from "react";
import api from "../services/api";

function UploadEmployees() {
  // --- States للـ Bulk Upload ---
  const [file, setFile] = useState(null);
  const [bulkMessage, setBulkMessage] = useState({ text: "", type: "" });
  const [loadingBulk, setLoadingBulk] = useState(false);

  // --- States للـ Single Employee ---
  const [formData, setFormData] = useState({ 
    employeeId: '', name: '', phone: '', password: '' 
  });
  const [singleMessage, setSingleMessage] = useState("");
  const [loadingSingle, setLoadingSingle] = useState(false);

  // upload bulk employees
  const handleBulkUpload = async () => {
    if (!file) {
      setBulkMessage({ text: "⚠️ Choose a file please", type: "error" });
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append("file", file);
    setLoadingBulk(true);
    setBulkMessage({ text: "🚀 Processing... Please wait", type: "info" });

    try {
      const res = await api.post("/admin/auth/bulk", formDataFile, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: 'blob' 
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Credentials_${new Date().toLocaleDateString()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setBulkMessage({ text: "✅ Done! Credentials file downloaded.", type: "success" });
      setFile(null);
      setTimeout(() => setBulkMessage({ text: "", type: "" }), 5000);
    } catch (err) {
      setBulkMessage({ text: "❌ Upload failed. Check file format.", type: "error" });
    } finally {
      setLoadingBulk(false);
    }
  };

  // add new employee
  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSingle(true);
    try {
      await api.post("/admin/auth/addEmployee", formData);
      setSingleMessage("✅ Employee added successfully!");
      setFormData({ employeeId: '', name: '', phone: '', password: '' });
      setTimeout(() => setSingleMessage(""), 4000);
    } catch (err) {
      setSingleMessage(err.response?.data?.message || "❌ Failed to add employee");
    } finally {
      setLoadingSingle(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Shared Styles (Light Mode) ---
  const inputStyle = {
    padding: '12px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: '30px'
  };

  const sectionTitleStyle = {
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#1e293b', margin: 0 }}>Employee Registration</h2>
      </header>

      {/* 1. Bulk Upload Card */}
      <section style={cardStyle}>
        <h2 style={sectionTitleStyle}>📦 Bulk Import (Excel)</h2>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loadingBulk}
              style={{ fontSize: '14px', color: '#475569' }}
            />
            <button 
              onClick={handleBulkUpload} 
              disabled={loadingBulk || !file}
              style={{ 
                padding: '10px 24px', 
                backgroundColor: loadingBulk ? '#94a3b8' : '#2563eb', 
                color: 'white', border: 'none', borderRadius: '8px', 
                cursor: loadingBulk ? 'not-allowed' : 'pointer',
                fontWeight: '600', transition: '0.2s'
              }}
            >
              {loadingBulk ? "Processing..." : "Generate & Download"}
            </button>
        </div>

        {bulkMessage.text && (
            <div style={{ 
                marginTop: '15px', padding: '10px', borderRadius: '6px', fontSize: '14px',
                backgroundColor: bulkMessage.type === 'success' ? '#f0fdf4' : bulkMessage.type === 'info' ? '#eff6ff' : '#fef2f2',
                color: bulkMessage.type === 'success' ? '#166534' : bulkMessage.type === 'info' ? '#1e40af' : '#991b1b',
                border: `1px solid ${bulkMessage.type === 'success' ? '#bbf7d0' : bulkMessage.type === 'info' ? '#bfdbfe' : '#fecaca'}`
            }}>
                {bulkMessage.text}
            </div>
        )}
      </section>

      {/* 2. Single Employee Card */}
      <section style={cardStyle}>
        <h2 style={sectionTitleStyle}>👤 Add Single Employee</h2>
        
        <form onSubmit={handleSingleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ gridColumn: 'span 1' }}>
            <label style={labelStyle}>Employee ID</label>
            <input name="employeeId" placeholder="e.g. 1001" value={formData.employeeId} onChange={handleInputChange} required style={inputStyle} />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <label style={labelStyle}>Full Name</label>
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <label style={labelStyle}>Phone Number</label>
            <input name="phone" placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleInputChange} required style={inputStyle} />
          </div>
          <div style={{ gridColumn: 'span 1' }}>
            <label style={labelStyle}>Set Password</label>
            <input name="password" type="text" placeholder="Password" value={formData.password} onChange={handleInputChange} required style={inputStyle} />
          </div>
          
          <button 
            type="submit" 
            disabled={loadingSingle}
            style={{ 
                gridColumn: 'span 2',
                padding: '14px', 
                backgroundColor: loadingSingle ? '#94a3b8' : '#16a34a', 
                color: 'white', border: 'none', borderRadius: '8px', 
                cursor: loadingSingle ? 'not-allowed' : 'pointer',
                fontWeight: 'bold', fontSize: '16px', marginTop: '10px'
            }}
          >
            {loadingSingle ? "Saving..." : "Save Employee"}
          </button>
        </form>

        {singleMessage && (
            <div style={{ 
                marginTop: '15px', padding: '12px', borderRadius: '8px', textAlign: 'center',
                backgroundColor: singleMessage.includes("✅") ? "#f0fdf4" : "#fef2f2",
                color: singleMessage.includes("✅") ? "#166534" : "#991b1b",
                border: `1px solid ${singleMessage.includes("✅") ? "#bbf7d0" : "#fecaca"}`
            }}>
                {singleMessage}
            </div>
        )}
      </section>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#475569',
  marginBottom: '6px'
};

export default UploadEmployees;