import axios from "axios";
import { URLAPIROOT } from "../root";

const Http = axios.create({
    baseURL: URLAPIROOT,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default Http