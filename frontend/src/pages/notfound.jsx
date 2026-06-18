import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/adminAuthContext"; 
import { useEmployeeAuth } from "../context/EmployeeAuthContext"; 

export default function NotFound() {
  const navigate = useNavigate();
  const { token } = useAuth();   
  const { employeeToken } = useEmployeeAuth(); 

  const handleGoBack = () => {
    if (token) {
      navigate("/app/dashboard"); 
    } else if (employeeToken) {
      navigate("/employee/dashboard");
    } 
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-900 font-sans text-slate-100 text-center p-5">
      
      <h1 className="text-8xl font-bold m-0 text-blue-500 selection:bg-blue-500 selection:text-white">
        404
      </h1>
      
      <h2 className="text-2xl font-semibold capitalize mt-2 mb-3">
        page not found
      </h2>
      
      <p className="text-slate-400 text-base max-w-md mb-6 leading-relaxed">
        The path you are trying to access is incorrect or you do not have permission to enter it
      </p>
      
      {(token || employeeToken) && (
        <button 
          onClick={handleGoBack} 
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md text-base shadow-md transition-colors duration-200 cursor-pointer"
        >
          GO Back
        </button>
      )}

    </div>
  );
}

