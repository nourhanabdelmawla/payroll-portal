import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/adminAuthContext";
import { useNavigate, useLocation } from "react-router-dom"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/admin/auth/login", { email, password });
      login(res.data.token);
      
      const destination = location.state?.from?.pathname || "/app/dashboard";
      
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900 font-sans">
      
      <div className="w-[320px] bg-slate-800 p-[30px_25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.3)] text-center">
        
        <div className="mb-[25px]">
          <h2 className="m-0 mb-2 text-slate-200 text-2xl font-bold">Admin Portal</h2>
          <p className="m-0 text-slate-400 text-xs">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[18px] text-left">
          
          <div className="flex flex-col gap-[6px]">
            <label className="text-xs text-slate-300">Email Address</label>
            <input
              className="p-2.5 rounded-md border border-slate-700 text-sm outline-none bg-slate-900 text-slate-100 focus:border-blue-500 transition-colors duration-200"
              type="email"
              placeholder="enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-xs text-slate-300">Password</label>
            <input
              className="p-2.5 rounded-md border border-slate-700 text-sm outline-none bg-slate-900 text-slate-100 focus:border-blue-500 transition-colors duration-200"
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-400 text-xs text-center m-0">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`p-[11px] rounded-md text-white text-sm font-semibold mt-2.5 transition-all duration-200 shadow-sm
              ${loading 
                ? "bg-slate-600 cursor-not-allowed opacity-70" 
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer active:scale-[0.98]"
              }`}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <footer className="mt-[25px] text-[11px] text-slate-500 tracking-wider">
          © 1978 HFDI
        </footer>
      </div>
    </div>
  );
}