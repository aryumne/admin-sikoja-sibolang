import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Loadable from '../../components/Loadable';
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();
const token = cookies.get("access_token");

const Dashboard = Loadable(React.lazy(() => import('../../pages/main/dashboard')));
const Sikoja = Loadable(React.lazy(() => import('../../pages/main/sikoja')));
const DetailSikoja = Loadable(React.lazy(() => import('../../pages/main/sikoja/detail')));
const Sibolang = Loadable(React.lazy(() => import('../../pages/main/sibolang')));
const DetailSibolang = Loadable(React.lazy(() => import('../../pages/main/sibolang/detail')));
const User = Loadable(React.lazy(() => import('../../pages/main/user')));
const Instance = Loadable(React.lazy(() => import('../../pages/main/master/Instance')));
const Village = Loadable(React.lazy(() => import('../../pages/main/master/Village')));
const Street = Loadable(React.lazy(() => import('../../pages/main/master/Street')));
const Category = Loadable(React.lazy(() => import('../../pages/main/master/Category')));
const Status = Loadable(React.lazy(() => import('../../pages/main/master/Status')));


const MainRoutes = {
    path: '/',
    element: token ? <MainLayout /> : <Navigate to='/login' />,
    children: [
        {
            path: '/',
            element: <Dashboard />,
        },
        {
            path: 'dashboard',
            element: <Dashboard />,
        },
        {
            path: 'sikoja',
            children: [
                {
                    path: '',
                    element: <Sikoja />
                },
                {
                    path: ':id',
                    element: <DetailSikoja />
                },
            ]
        },
        {
            path: 'sibolang',
            children: [
                {
                    path: '',
                    element: <Sibolang />
                },
                {
                    path: ':id',
                    element: <DetailSibolang />
                },
            ]
        },
        {
            path: 'user',
            element: <User />,
        },
        {
            path: 'instance',
            element: <Instance />,
        },
        {
            path: 'village',
            element: <Village />,
        },
        {
            path: 'street',
            element: <Street />,
        },
        {
            path: 'category',
            element: <Category />,
        },
        {
            path: 'status',
            element: <Status />,
        },

    ]
}

export default MainRoutes