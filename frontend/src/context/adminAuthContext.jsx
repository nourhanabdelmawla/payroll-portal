import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(
    sessionStorage.getItem("adminToken")
  );

  const login = (token) => {
    sessionStorage.setItem("adminToken", token);
    setToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    setToken(null);
  };

  return (
   <AdminAuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAuth = () => useContext(AdminAuthContext);
