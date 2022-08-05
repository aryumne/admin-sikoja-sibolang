import axios from "axios";
import { URLAPIROOT } from "../root";

const HTTPAuth = axios.create({
    withCredentials: true,
    baseURL: URLAPIROOT,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default HTTPAuth