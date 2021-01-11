import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.headers.post["Content-Type"] = "application/json";

const token = localStorage.getItem("token");

if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(null, (error) => {
    const expectedErrors =
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedErrors) {
        // console.log(error);
        toast.error("مشکلی از سمت سرور رخ داده است");
    } else if (error.response.status === 401) {
        if (window.location.pathname === "/admin") {
            window.location.replace("admin/login");
        } else {
            window.location.replace("/login");
        }
    } else {
        if (error.response.data.errors) {
            if (typeof error.response.data.errors.msg === "object") {
                error.response.data.errors.msg.map((err => toast.error(err.msg)))
            } else {
                toast.error(error.response.data.errors.msg)
            }
        }
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};
