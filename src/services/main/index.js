import axios from "axios";
import { Logout } from "../../utils/Auth";
import { URLAPIROOT } from "../root";
import { GetCookie } from "../root";

const cookie = GetCookie();
const HTTPMAIN = () => {
    const http = axios.create({
        withCredentials: true,
        baseURL: URLAPIROOT,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': decodeURIComponent(cookie),
        }
    })
    http.interceptors.response.use(response => response, error => {
        if (error.response.status === 401 || error.response.status === 403) {
            Logout()
        }

        return Promise.reject(error)
    })

    return http

}
export default HTTPMAIN 