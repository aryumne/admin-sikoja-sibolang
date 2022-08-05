import axios from "axios";
import HTTPAuth from ".";
import { URLROOT } from "../root";

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

const APIAUTH = {
    Login,
}

export default APIAUTH