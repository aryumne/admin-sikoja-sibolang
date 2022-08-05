import React from 'react';
import Cookies from "universal-cookie";
import AuhtLayout from '../../layouts/AuhtLayout';
import { Navigate } from "react-router-dom";
import Loadable from '../../components/Loadable';

const cookies = new Cookies();
const token = cookies.get("access_token");

const Login = Loadable(React.lazy(() => import('../../pages/auth/Login')));
const VerifyEmail = Loadable(React.lazy(() => import('../../pages/auth/VerifyEmail')));
const ForgotPassword = Loadable(React.lazy(() => import('../../pages/auth/ForgotPassword')));

const AuthRoutes = {
    path: '/',
    element: !token ? <AuhtLayout /> : <Navigate to='/dashboard' />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'verify-email',
            element: <VerifyEmail />
        },
        {
            path: 'forgot-password',
            element: <ForgotPassword />
        },
    ]
}

export default AuthRoutes