import { createContext, useContext, useState, useCallback } from "react";

const EmployeeAuthContext = createContext();

console.log("EmployeeAuthProvider Loaded");

export function EmployeeAuthProvider({ children }) {
  const [employeeToken, setEmployeeToken] = useState(
    sessionStorage.getItem("employeeToken")
  );

  const [employeeData, setEmployeeData] = useState(() => {
    const savedData = sessionStorage.getItem("employeeData") || sessionStorage.getItem("employee");
    if (!savedData || savedData === "undefined") return null;
    try {
      return JSON.parse(savedData);
    } catch (e) {
      return null;
    }
  });

  const employeeLogin = useCallback((token, employee) => {
    sessionStorage.setItem("employeeToken", token);
    sessionStorage.setItem("employeeData", JSON.stringify(employee));

    setEmployeeToken(token);
    setEmployeeData(employee);
  }, []);

  const employeeLogout = useCallback(() => {
    sessionStorage.removeItem("employeeToken");
    sessionStorage.removeItem("employeeData");
    sessionStorage.removeItem("employee");

    setEmployeeToken(null);
    setEmployeeData(null);
  }, []);

  return (
    <EmployeeAuthContext.Provider value={{ employeeToken, employeeData, employeeLogin, employeeLogout }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export const useEmployeeAuth = () => useContext(EmployeeAuthContext);
