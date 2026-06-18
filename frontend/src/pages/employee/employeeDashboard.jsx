import { useEffect, useState } from "react";
import employeeApi from "../../services/employeeApi";
import SalarySlipCard from "../../components/salarySlip/salarySlipCard";
import PdfViewer from "../../components/salarySlip/PdfViewer";

export default function EmployeeDashboard() {
  const [slip, setSlip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchSlip = async () => {
      const currentToken = sessionStorage.getItem("employeeToken");

      if (!currentToken) {
        console.error("Employee token is missing!");
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      };

      try {
        const res = await employeeApi.get("/employees/salary", config);
        setSlip(res.data.data);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err.response?.data || err.message);
        // This will display the backend message (like "No salary slip available") or the fallback text
        setError(err.response?.data?.message || "Failed to load payroll data at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlip();
  }, []);

  const loadPdfIntoMemory = async () => {
    if (pdfUrl && pdfUrl.startsWith("blob:")) return pdfUrl;

    const currentToken = sessionStorage.getItem("employeeToken");

    const config = {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    };

    try {
      const response = await employeeApi.get(
        "/employees/salary?file=true",
        {
          ...config,
          responseType: "blob",
        }
      );

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const newUrl = URL.createObjectURL(file);
      setPdfUrl(newUrl);
      return newUrl;

    } catch (err) {
      alert("Unable to load salary slip PDF.");
      console.error(err);
    }
  };

  const handleViewPdf = async () => {
    await loadPdfIntoMemory();
  };

  const handleDownloadPdf = async () => {
    const currentUrl = await loadPdfIntoMemory();
    if (currentUrl) {
      const link = document.createElement("a");
      link.href = currentUrl;
      link.download = `SalarySlip-${slip?.month || "file"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 text-slate-500 font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-600 mx-auto mb-3"></div>
          <p>Loading payroll data...</p>
        </div>
      </div>
    );
  }

  // 2. Error or Empty State
  if (error || !slip) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 p-6 font-sans">
        <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-sm border border-slate-200 text-center">
          <div className="text-amber-500 text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Payroll Status</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {error || "No current salary slips found for your account."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 bg-slate-50 min-h-screen p-6 font-sans">
      <div>
        <SalarySlipCard
          slip={slip}
          onView={handleViewPdf}
          onDownload={handleDownloadPdf}
        />
      </div>
      <div className="xl:col-span-2">
        <PdfViewer pdfUrl={pdfUrl} />
      </div>
    </div>
  );
}