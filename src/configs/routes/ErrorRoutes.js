import React from 'react';
import AuhtLayout from '../../layouts/AuhtLayout';
import Loadable from '../../components/Loadable';

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
            element: <VerifyEmail />
        },
        {
            path: 'verify-me',
            children: [
                {
                    path: ':username',
                    element: <VerifyMe />
                }
            ]
        },

    ]
}

export default ErrorRoutes