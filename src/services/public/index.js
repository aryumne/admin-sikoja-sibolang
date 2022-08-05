import axios from "axios";
import { URLAPIROOT } from "../root";

const Http = axios.create({
    withCredentials: true,
    baseURL: URLAPIROOT,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})

export default Http