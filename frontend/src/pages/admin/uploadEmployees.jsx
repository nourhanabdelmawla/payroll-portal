import { useState } from "react";
import api from "../../services/api";

export default function UploadEmployees() {
  const [file, setFile] = useState(null);
  const [bulkMessage, setBulkMessage] = useState({
    text: "",
    type: "",
  });

  const [loadingBulk, setLoadingBulk] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    phone: "",
    password: "",
  });

  const [singleMessage, setSingleMessage] = useState("");
  const [loadingSingle, setLoadingSingle] = useState(false);

  // Bulk Upload
  const handleBulkUpload = async () => {
    if (!file) {
      setBulkMessage({
        text: "Choose a file please",
        type: "error",
      });

      return;
    }

    const formDataFile = new FormData();
    formDataFile.append("file", file);

    setLoadingBulk(true);

    setBulkMessage({
      text: "Processing... Please wait",
      type: "info",
    });

    try {
      const res = await api.post(
        "/admin/auth/bulk",
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `Credentials_${new Date().toLocaleDateString()}.xlsx`
      );

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(url);

      setBulkMessage({
        text: "Done! Credentials file downloaded.",
        type: "success",
      });

      setFile(null);

      setTimeout(() => {
        setBulkMessage({
          text: "",
          type: "",
        });
      }, 5000);

    } catch (err) {
      setBulkMessage({
        text: "Upload failed. Check file format.",
        type: "error",
      });
    } finally {
      setLoadingBulk(false);
    }
  };

  // Add Single Employee
  const handleSingleSubmit = async (e) => {
    e.preventDefault();

    setLoadingSingle(true);

    try {
      await api.post(
        "/admin/auth/addEmployee",
        formData
      );

      setSingleMessage(
        "✅ Employee added successfully!"
      );

      setFormData({
        employeeId: "",
        name: "",
        phone: "",
        password: "",
      });

      setTimeout(() => {
        setSingleMessage("");
      }, 4000);

    } catch (err) {
      setSingleMessage(
        err.response?.data?.message ||
          "❌ Failed to add employee"
      );
    } finally {
      setLoadingSingle(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Employee Registration
        </h2>

        <p className="text-slate-500 mt-2">
          Manage employees and upload credentials
        </p>
      </header>

      {/* Bulk Upload */}
      <section className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        shadow-sm
        p-8
        mb-8
      ">

        <div className="flex items-center gap-3 mb-6">
          <div className="
            w-12
            h-12
            rounded-2xl
            bg-indigo-100
            flex
            items-center
            justify-center
            text-2xl
          ">
            📦
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Bulk Import (Excel)
            </h3>

            <p className="text-sm text-slate-500">
              Upload Excel file and generate credentials
            </p>
          </div>
        </div>

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          gap-4
        ">

          <input
            type="file"
            accept=".xlsx"
            disabled={loadingBulk}
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="
              block
              w-full
              text-sm
              text-slate-500
              file:mr-4
              file:rounded-xl
              file:border-0
              file:bg-slate-100
              file:px-4
              file:py-3
              file:text-sm
              file:font-medium
              file:text-slate-700
              hover:file:bg-slate-200
            "
          />

          <button
            onClick={handleBulkUpload}
            disabled={loadingBulk || !file}
            className="
              rounded-2xl
              bg-indigo-500
              px-6
              py-3
              text-white
              font-semibold
              transition
              hover:bg-indigo-600
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loadingBulk
              ? "Processing..."
              : "Generate & Download"}
          </button>

        </div>

        {bulkMessage.text && (
          <div
            className={`
              mt-5
              rounded-2xl
              border
              px-4
              py-3
              text-sm
              font-medium

              ${
                bulkMessage.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : bulkMessage.type === "info"
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }
            `}
          >
            {bulkMessage.text}
          </div>
        )}

      </section>

      {/* Single Employee */}
      <section className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        shadow-sm
        p-8
      ">

        <div className="flex items-center gap-3 mb-6">

          <div className="
            w-12
            h-12
            rounded-2xl
            bg-emerald-100
            flex
            items-center
            justify-center
            text-2xl
          ">
            👤
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Add Single Employee
            </h3>

            <p className="text-sm text-slate-500">
              Create employee account manually
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSingleSubmit}
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {/* Employee ID */}
          <div>
            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-600
            ">
              Employee ID
            </label>

            <input
              name="employeeId"
              placeholder="e.g. 1001"
              value={formData.employeeId}
              onChange={handleInputChange}
              required
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-600
            ">
              Full Name
            </label>

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {/* Phone */}
          <div>
            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-600
            ">
              Phone Number
            </label>

            <input
              name="phone"
              placeholder="01xxxxxxxxx"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-600
            ">
              Set Password
            </label>

            <input
              name="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-slate-50
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadingSingle}
            className="
              md:col-span-2
              mt-2
              rounded-2xl
              bg-emerald-500
              py-4
              text-white
              font-bold
              text-lg
              transition
              hover:bg-emerald-600
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loadingSingle
              ? "Saving..."
              : "Save Employee"}
          </button>

        </form>

        {singleMessage && (
          <div
            className={`
              mt-5
              rounded-2xl
              border
              px-4
              py-3
              text-center
              font-medium

              ${
                singleMessage.includes("✅")
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }
            `}
          >
            {singleMessage}
          </div>
        )}

      </section>

    </div>
  );
}

