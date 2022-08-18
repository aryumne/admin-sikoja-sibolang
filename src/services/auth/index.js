import axios from "axios";
import { URLAPIROOT } from "../root";

const HTTPAuth = axios.create({
    withCredentials: true,
    baseURL: URLAPIROOT,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '.mkwlapor.com',
        'Cache-Control': 'no-cache',
        'Fragma': 'no-cache',
        'Expires': '0'
    }
})

export default HTTPAuth