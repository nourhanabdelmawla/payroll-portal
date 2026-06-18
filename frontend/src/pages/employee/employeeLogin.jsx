
import { useState } from "react";
import employeeApi from "../../services/employeeApi";
import { useNavigate } from "react-router-dom";
import { useEmployeeAuth } from "../../context/employeeAuthContext";

const EmployeeLogin = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { employeeLogin } = useEmployeeAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await employeeApi.post("/employees/login", {
        employeeId,
        password
      });

      console.log("Backend Response:", res.data);

      if (res.data.ok || res.data.token) {
        const employeeData = {
          name: res.data.name || "Employee",
          employeeId: employeeId
        };

        employeeLogin(res.data.token, employeeData);
        navigate("/employee/dashboard");
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid Employee ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-900 font-sans">
      
      <form 
        onSubmit={handleLogin} 
        className="w-[300px] p-[30px_25px] bg-slate-800 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex flex-col gap-[15px] text-center"
      >
        <h2 className="text-slate-200 text-2xl font-bold m-0">
          Welcome
        </h2>
        <p className="text-slate-400 text-xs mb-2 leading-relaxed">
          Helwan Factory for Developed Industry
        </p>

        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="p-2.5 rounded-md border border-slate-700 bg-slate-900 text-slate-100 outline-none focus:border-blue-500 transition-colors duration-200"
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2.5 rounded-md border border-slate-700 bg-slate-900 text-slate-100 outline-none focus:border-blue-500 transition-colors duration-200"
          required
          disabled={loading}
        />

        {error && (
          <p className="text-red-400 text-xs m-0">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className={`mt-2.5 p-2.5 text-white font-semibold rounded-md transition-all duration-200 shadow-sm
            ${loading 
              ? "bg-slate-600 cursor-not-allowed opacity-70" 
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-[0.98]"
            }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

      </form>
    </div>
  );
};

export default EmployeeLogin;

