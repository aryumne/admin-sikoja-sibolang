import axios from "axios";
import { URLAPIROOT } from "../root";

const token = localStorage.getItem('mytoken');
const Http = axios.create({
    baseURL: URLAPIROOT,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
})

export default Http