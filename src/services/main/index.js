import axios from "axios";
import { Logout } from "../../utils/Auth";
import { URLAPIROOT } from "../root";
import { GetCookie } from "../../utils/GetCookieToken";
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
        if (error.response.status === 401) {
            Logout()
        } else if (error.response.status === 403) {
            window.history.back()
        }

        return Promise.reject(error)
    })

    return http

}
export default HTTPMAIN 