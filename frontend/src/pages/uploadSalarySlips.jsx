import { useState } from "react";
import api from "../services/api";

export default function UploadSalaries() {
  const [bulkFile, setBulkFile] = useState(null);

  const [month, setMonth] = useState("January");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [message, setMessage] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleBulkUpload = async () => {
    if (!bulkFile) return setMessage("Choose ZIP file first");

    try {
      const formData = new FormData();
      formData.append("zip", bulkFile); 
      formData.append("month", month); 
      formData.append("year", year);   

      const res = await api.post("/admin/salaries/upload-zip", formData);
      setMessage(res.data.message);
      
    } catch (error) {
        setMessage(error.response?.data?.message || "Upload failed");
      }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Bulk Upload Salaries</h2>
      
      
      <div style={{ marginBottom: 10 }}>
        <label>Select Month: </label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      
      <div style={{ marginBottom: 10 }}>
        <label>Year: </label>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
        />
      </div>

      <input
        type="file"
        accept=".zip"
        onChange={(e) => setBulkFile(e.target.files[0])}
      />
      <button onClick={handleBulkUpload}>Upload ZIP</button>

      <p>{message}</p>
    </div>
  );
}















