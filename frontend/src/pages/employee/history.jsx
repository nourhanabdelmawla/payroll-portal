import { useEffect, useState } from "react";
import employeeApi from "../../services/employeeApi";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = sessionStorage.getItem("employeeToken");

      const res = await employeeApi.get("/employees/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data.data);
    };

    fetchHistory();
  }, []);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6 text-slate-800">
        Salary History
      </h1>

      <div className="space-y-3">

        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center"
          >

            <div>
              <p className="font-medium">{item.month}</p>
              <p className="text-sm text-slate-500">
                {new Date(item.uploadedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">

              <button className="px-3 py-2 bg-indigo-500 text-white rounded-lg">
                View
              </button>

              <button className="px-3 py-2 border rounded-lg">
                Download
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}