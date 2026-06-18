import Navbar from "../components/employee/navbar";
import Sidebar from "../components/employee/historySidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function EmployeeLayout() {
  const location = useLocation();

  const isHistoryPage = location.pathname === "/employee/history";

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <div className="flex">

        {isHistoryPage && <Sidebar />}

        <main className="flex-1 p-6 transition-all duration-300">
          <Outlet />
        </main>

      </div>

    </div>
  );
}