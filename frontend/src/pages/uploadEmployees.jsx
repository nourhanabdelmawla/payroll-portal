import { useState } from "react";
import api from "../services/api";

function UploadEmployees() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMessage(" choose a file please");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post(
        "/admin/employees/bulk",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      setMessage(res.data.message );
    } catch (err) {
      setMessage(
        err.response?.data?.message 
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Employees</h2>

      <input
        type="file"
        accept=".csv,.xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload
      </button>

      <p>{message}</p>
    </div>
  );
}

export default UploadEmployees;




