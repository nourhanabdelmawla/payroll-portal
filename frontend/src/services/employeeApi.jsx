import axios from "axios";

const employeeApi = axios.create({
    baseURL: "http://localhost:3000/api",
});

// REQUEST
employeeApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("employeeToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// RESPONSE (AUTO REFRESH)
employeeApi.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url !== "/employees/refresh-token"
        ) {
            originalRequest._retry = true;

            try {
                const pToken = localStorage.getItem("pToken");

                if (!pToken) throw new Error("No permanent token found");

                const refreshRes = await axios.post(
                    "http://localhost:3000/api/employees/refresh-token",
                    { pToken }
                );

                const newToken = refreshRes.data.token;

                sessionStorage.setItem("employeeToken", newToken);

                originalRequest.headers =
                    originalRequest.headers || {};

                originalRequest.headers.Authorization =
                    `Bearer ${newToken}`;

                return employeeApi(originalRequest);

            } catch (refreshError) {
                sessionStorage.removeItem("employeeToken");
                localStorage.removeItem("pToken");

                window.location.href = "/employee/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default employeeApi;