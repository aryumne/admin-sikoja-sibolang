import React from 'react';

import AuhtLayout from '../../layouts/AuhtLayout';
import Loadable from '../../components/Loadable';

const Login = Loadable(React.lazy(() => import('../../pages/auth/Login')));
const VerifyEmail = Loadable(React.lazy(() => import('../../pages/auth/VerifyEmail')));
const ForgotPassword = Loadable(React.lazy(() => import('../../pages/auth/ForgotPassword')));

const AuthRoutes = {
    path: '/',
    element: <AuhtLayout />,
    children: [
        {
            path: '/',
            element: <Login />
        },
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