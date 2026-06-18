import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      
      <Sidebar /> 

      <main className="flex-1 p-[30px] bg-[#f1f5f9]">
        <Outlet />
      </main>

    </div>
  );
}