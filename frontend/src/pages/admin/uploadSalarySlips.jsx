import { useState } from "react";
import api from "../../services/api";

export default function UploadSalaries() {
  const [bulkFile, setBulkFile] = useState(null);

  const [month, setMonth] = useState("January");

  const [year, setYear] = useState(
    new Date().getFullYear().toString()
  );

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleBulkUpload = async () => {
    if (!bulkFile) {
      return setMessage({
        text: "Please choose a ZIP file first",
        type: "error",
      });
    }

    setLoading(true);

    setMessage({
      text: "Uploading and processing salaries...",
      type: "info",
    });

    try {
      const formData = new FormData();

      formData.append("zip", bulkFile);
      formData.append("month", month);
      formData.append("year", year);

      const res = await api.post(
        "/salaries/upload-zip",
        formData
      );

      setMessage({
        text: `${res.data.message}`,
        type: "success",
      });

      setBulkFile(null);

    } catch (error) {
      setMessage({
        text:
          error.response?.data?.message ||
          "Upload failed",
        type: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          💰 Upload Salaries
        </h2>

        <p className="text-slate-500 mt-2">
          Upload salary ZIP files and process employee payslips
        </p>

      </div>

      {/* Main Card */}
      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          p-8
        "
      >

        {/* Month + Year */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
            mb-8
          "
        >

          {/* Month */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-slate-600
              "
            >
              Select Month
            </label>

            <select
              value={month}
              onChange={(e) =>
                setMonth(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-slate-700
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

          </div>

          {/* Year */}
          <div>

            <label
              className="
                block
                mb-2
                text-sm
                font-semibold
                text-slate-600
              "
            >
              Year
            </label>

            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-slate-700
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />

          </div>

        </div>

        {/* File Upload */}
        <div
          className="
            rounded-3xl
            border-2
            border-dashed
            border-slate-300
            bg-slate-50
            p-10
            text-center
            mb-8
          "
        >

          <div className="text-5xl mb-4">
            📁
          </div>

          <h3 className="text-lg font-semibold text-slate-700">
            Upload Salary ZIP File
          </h3>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Select ZIP file containing employee salary slips
          </p>

          <input
            type="file"
            accept=".zip"
            disabled={loading}
            onChange={(e) =>
              setBulkFile(e.target.files[0])
            }
            className="
              block
              mx-auto
              text-sm
              text-slate-500
              file:mr-4
              file:rounded-xl
              file:border-0
              file:bg-indigo-100
              file:px-5
              file:py-3
              file:text-sm
              file:font-semibold
              file:text-indigo-700
              hover:file:bg-indigo-200
            "
          />

          {bulkFile && (
            <div
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-indigo-50
                px-4
                py-2
                text-sm
                font-medium
                text-indigo-600
              "
            >
              📦 {bulkFile.name}
            </div>
          )}

        </div>

        {/* Upload Button */}
        <button
          onClick={handleBulkUpload}
          disabled={loading || !bulkFile}
          className="
            w-full
            rounded-2xl
            bg-indigo-500
            py-4
            text-lg
            font-bold
            text-white
            transition
            hover:bg-indigo-600
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Uploading..."
            : "Upload & Process"}
        </button>

        {/* Message */}
        {message.text && (
          <div
            className={`
              mt-6
              rounded-2xl
              border
              px-5
              py-4
              text-center
              font-medium

              ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : message.type === "info"
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }
            `}
          >
            {message.text}
          </div>
        )}

      </div>

    </div>
  );
}
