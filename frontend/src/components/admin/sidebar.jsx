import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/adminAuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-56 bg-[#1e293b] text-white py-7 flex flex-col sticky top-0 h-screen transition-all duration-300">
      <div>
        <div className="flex items-center gap-2.5 px-5 mb-9">
          <div className="bg-[#3b82f6] text-white px-2 py-1 rounded-md font-bold text-sm">
            S
          </div>
          <h6 className="text-lg m-0 text-white font-semibold">Salary Portal</h6>
        </div>

        <nav>
          <ul className="list-none p-0 margin-0">
            <SidebarLink 
              to="/app/dashboard" 
              label="Dashboard" 
              icon="📊" 
              active={location.pathname === "/app/dashboard"} 
            />
            <SidebarLink 
              to="/app/upload_employees" 
              label="Employees" 
              icon="👥" 
              active={location.pathname === "/app/upload_employees"} 
            />
            <SidebarLink 
              to="/app/upload_salaries" 
              label="Salaries" 
              icon="💰" 
              active={location.pathname === "/app/upload_salaries"} 
            />
            
            <li className="mt-2.5">
              <button 
                onClick={logout} 
                className="w-full flex items-center gap-3 px-5 py-3 bg-transparent text-[#f87171] border-none cursor-pointer text-[15px] font-normal text-left transition-colors duration-200 hover:bg-[#2d3748]"
              >
                <span className="text-xl w-6">🚪</span>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function SidebarLink({ to, label, icon, active }) {
  return (
    <li className="mb-1">
      <Link 
        to={to} 
        className={`flex items-center gap-3 px-5 py-3 text-[15px] font-normal text-left no-underline transition-all duration-200 border-l-4 
          ${active 
            ? "bg-[#334155] text-[#3b82f6] border-[#3b82f6]" 
            : "bg-transparent text-white border-transparent hover:bg-[#2d3748] hover:text-[#3b82f6]"
          }`}
      >
        <span className="text-xl w-6 flex items-center justify-start">{icon}</span>
        {label}
      </Link>
    </li>
  );
}
