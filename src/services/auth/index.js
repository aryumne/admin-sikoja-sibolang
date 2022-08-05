import axios from "axios";
import { URLAPIROOT } from "../root";
import { GetCookie } from "../root";

const cookie = GetCookie();
const HTTPAuth = axios.create({
    withCredentials: true,
    baseURL: URLAPIROOT,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(cookie),
    }
})

export default HTTPAuth