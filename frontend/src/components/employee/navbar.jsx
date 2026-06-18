import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEmployeeAuth } from "../../context/employeeAuthContext";

import logo from "../../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [openMenu, setOpenMenu] = useState(false);

  const { employeeData, employeeLogout } = useEmployeeAuth();

  const currentEmployee = employeeData || {
    name: "Employee",
    employeeId: "0000",
  };

  const handleLogout = () => {
    employeeLogout();
    navigate("/employee/login");
  };

  const isHomeActive = location.pathname === "/employee/dashboard" || location.pathname === "/employee";
  const isHistoryActive = location.pathname === "/employee/history";

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md relative z-50">
      {/* LOGO */}
      <div className="flex items-center gap-3 select-none">
        <img src={logo} alt="Payroll System" className="w-9 h-9 rounded-md object-cover" />
        <h1 className="text-lg font-bold tracking-wider">HFDI</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 relative">
        {/* USER INFO */}
        <div className="text-right hidden sm:block select-none">
          <p className="font-medium text-sm text-slate-100">{currentEmployee.name}</p>
          <p className="text-xs text-slate-400">ID: {currentEmployee.employeeId || currentEmployee.id}</p>
        </div>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="w-10 h-10 flex flex-col justify-center items-center gap-1 rounded-lg hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
        >
          <span className={`w-5 h-[2px] bg-white rounded transition-transform duration-300 ${openMenu ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`w-5 h-[2px] bg-white rounded transition-opacity duration-300 ${openMenu ? "opacity-0" : ""}`}></span>
          <span className={`w-5 h-[2px] bg-white rounded transition-transform duration-300 ${openMenu ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>

        {/* DROPDOWN MENU */}
        {openMenu && (
          <div className="absolute right-0 top-12 bg-white text-slate-800 w-48 rounded-xl shadow-xl border border-slate-100 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
            
            <button
              onClick={() => {
                navigate("/employee/dashboard");
                setOpenMenu(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-all duration-200 cursor-pointer
                ${isHomeActive 
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500" 
                  : "hover:bg-slate-50 text-slate-700 hover:text-blue-600"
                }`}
            >
              <span className={`text-lg transition-transform duration-200 ${isHomeActive ? "scale-110" : "grayscale opacity-70 group-hover:grayscale-0"}`}>
                🏠
              </span>
              Home
            </button>

            <button
              onClick={() => {
                navigate("/employee/history");
                setOpenMenu(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left font-medium transition-all duration-200 cursor-pointer
                ${isHistoryActive 
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500" 
                  : "hover:bg-slate-50 text-slate-700 hover:text-blue-600"
                }`}
            >
              <span className={`text-lg transition-transform duration-200 ${isHistoryActive ? "scale-110" : "grayscale opacity-70"}`}>
                📜
              </span>
              History
            </button>

            <hr className="border-slate-100 my-1" />

            <button
              onClick={() => {
                handleLogout();
                setOpenMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
            >
              <span className="text-lg">
                🚪
              </span>
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}