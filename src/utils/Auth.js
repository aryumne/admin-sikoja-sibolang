import { Navigate, useLocation } from 'react-router-dom';
import { GetCookie } from "../services/root";
import Cookies from 'universal-cookie';

const cookie = new Cookies();


export const SignIn = (res) => {
    if (res.status === 200) {
        window.location.href = '/verify-email'
    }
    localStorage.setItem('username', res.data.user.username)
    const XSRF_COOKIE = GetCookie();
    let date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    cookie.set('access_token', XSRF_COOKIE, { expires: date });
    window.location.href = "/login"
}


export const Logout = () => {
    cookie.remove('access_token');
    window.location.href = "/login"
}
