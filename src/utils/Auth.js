import { GetCookie } from "./GetCookieToken";
import Cookies from 'universal-cookie';
import { Navigate } from "react-router-dom";

const cookie = new Cookies();


export const SignIn = (res) => {
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('username', res.data.user.username)
    localStorage.setItem('name', res.data.user.name)
    localStorage.setItem('role', res.data.user.role_id)
    localStorage.setItem('instance', res.data.user.instance_id)

    const XSRF_COOKIE = GetCookie();
    let date = new Date();
    date.setTime(date.getTime() + (60 * 60 * 1000));
    cookie.set('access_token', XSRF_COOKIE, { expires: date });
    return res.data.user.email_verified_at === null
        ? window.location.replace("/verify-email") : window.location.href = "/login"
}



export const Logout = () => {
    cookie.remove('access_token', { path: '/' });
    localStorage.clear();
    window.location.href = "/login"
}

