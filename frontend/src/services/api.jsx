import axios from "axios";

const API = axios.create({baseURL:"http://localhost:3000/api",
}); 
API.interceptors.request.use((config)=>{
  const token = localStorage.getItem("adminToken");
  if (token){
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
export default API;




// export const getSalarySlip = async (token) => {
//   const res = await axios.get(`${API_BASE}/employees/salary?token=${token}`);
//   return res.data; // return filePath: "uploads/..." 
// };
