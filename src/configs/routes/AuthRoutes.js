import React from 'react';
import Cookies from "universal-cookie";
import AuhtLayout from '../../layouts/AuhtLayout';
import Loadable from '../../components/Loadable';
import { Navigate } from 'react-router-dom';

const cookies = new Cookies();
const token = cookies.get("access_token");

const Login = Loadable(React.lazy(() => import('../../pages/auth/Login')));
const ForgotPassword = Loadable(React.lazy(() => import('../../pages/auth/ForgotPassword')));
const ResetPassword = Loadable(React.lazy(() => import('../../pages/auth/ResetPassword')));

const AuthRoutes = {
    path: '/',
    element: !token ? <AuhtLayout /> : <Navigate to='/' replace={true} />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'forgot-password',
            element: <ForgotPassword />
        },
        {
            path: 'reset-password',
            element: <ResetPassword />
        },

    ]
}

export default AuthRoutes