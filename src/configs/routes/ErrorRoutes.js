import React from 'react';
import Cookies from "universal-cookie";
import AuhtLayout from '../../layouts/AuhtLayout';
import Loadable from '../../components/Loadable';
import { Navigate } from 'react-router-dom';

const cookies = new Cookies();
const token = cookies.get("access_token");

const Forbidden = Loadable(React.lazy(() => import('../../pages/error/Forbidden')));
const NotFound = Loadable(React.lazy(() => import('../../pages/error/NotFound')));
const VerifyEmail = Loadable(React.lazy(() => import('../../pages/auth/VerifyEmail')));
const VerifyMe = Loadable(React.lazy(() => import('../../pages/auth/VerifyMe')));

const ErrorRoutes = {
    path: '/',
    element: <AuhtLayout />,
    children: [
        {
            path: '*',
            element: <NotFound />
        },
        {
            path: 'forbidden',
            element: <Forbidden />
        },
        {
            path: 'verify-email',
            element: !token ? <Navigate to='/login' replace={true} /> : <VerifyEmail />
        },
        {
            path: 'verify-me',
            element: <VerifyMe />
        },

    ]
}

export default ErrorRoutes