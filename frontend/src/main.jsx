import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AdminAuthProvider } from "./context/adminAuthContext";
import { EmployeeAuthProvider } from "./context/employeeAuthContext";  
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <EmployeeAuthProvider> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EmployeeAuthProvider> 
    </AdminAuthProvider>
  </React.StrictMode>
);
