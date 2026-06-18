import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-5 hidden lg:block">

      <h2 className="text-indigo-500 font-bold text-xl mb-8">
        Employee
      </h2>

      <nav className="space-y-2">

        <NavLink
          to="/employee/dashboard"
          className="block px-3 py-2 rounded-lg hover:bg-slate-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employee/history"
          className="block px-3 py-2 rounded-lg hover:bg-slate-100"
        >
          History
        </NavLink>

      </nav>

    </aside>
  );
}