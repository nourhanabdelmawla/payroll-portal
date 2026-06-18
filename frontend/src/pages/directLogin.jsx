import React, { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useEmployeeAuth } from '../context/employeeAuthContext'; 
const DirectLogin = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { employeeLogin } = useEmployeeAuth();
    
    const hasCalledApi = useRef(false); 

    useEffect(() => {
        const pToken = searchParams.get('pToken');
        console.log("=== PToken Found in URL ===", pToken);

        if (!pToken) {
            console.error("No pToken found in URL params");
            navigate('/employee/login');
            return;
        }

        if (hasCalledApi.current) return;
        hasCalledApi.current = true;

        api.post('/employees/direct-login', { pToken })
            .then(res => {
                console.log("=== Response from Backend ===", res.data);

                if (res.data.ok && res.data.token) {
                    localStorage.setItem("pToken", pToken);
                    sessionStorage.setItem('employeeToken', res.data.token);
                    console.log("=== Token Saved securely as employeeToken ===");

                    const employeeData = {
                        name: res.data.name || "Employee",
                        employeeId: res.data.employeeId || ""
                    };

                    console.log("=== Sending Safe Employee Data to Context ===", employeeData);

                    employeeLogin(res.data.token, employeeData);
                    console.log("=== Auth Context Updated Successfully ===");

                    navigate('/employee/dashboard');
                } else {
                    console.error("Backend responded, but ok or token is missing", res.data);
                    alert('The link is invalid or has been revoked by management.');
                    navigate('/employee/login');
                }
            })
            .catch(err => {
                console.error("=== Error during direct login ===", err.response?.data || err.message);
                alert(err.response?.data?.message || 'An error occurred during automatic login.');
                navigate('/employee/login');
            });

    }, [searchParams, navigate]); 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 font-sans">
            <div className="p-8 bg-slate-800 rounded-2xl shadow-lg border border-slate-700 text-center w-[320px]">
                <h2 className="text-xl font-bold text-slate-200 mb-2 animate-pulse">🔄 Redirecting...</h2>
                <p className="text-sm text-slate-400 leading-relaxed">Verifying your secure access link, please wait a moment.</p>
            </div>
        </div>
    );
};

export default DirectLogin;

