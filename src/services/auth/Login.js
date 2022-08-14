import axios from "axios";
import HTTPAuth from ".";
import { URLROOT } from "../root";

axios.defaults.withCredentials = true;

const AuthLogin = (path, data) => {
    return new Promise((resolve, reject) => {
        axios.get(`${URLROOT}sanctum/csrf-cookie`).then(() => {
            HTTPAuth.post(path, data).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error.response);
            });
        });
    })
}


const Login = (data) => AuthLogin('login', data);
const ForgotPassword = (data) => AuthLogin('forgot-password', data);
const ResetPassword = (data) => AuthLogin('reset-password', data);

const APIAUTH = {
    Login,
    ForgotPassword,
    ResetPassword
}

export default APIAUTH