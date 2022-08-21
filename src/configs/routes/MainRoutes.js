import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import Loadable from '../../components/Loadable';
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();
const token = cookies.get("access_token");
const role = localStorage.getItem("role");

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
            element: role <= 2 ? <User /> : <Navigate to='/forbidden' replace />,
        },
        {
            path: 'instance',
            element: role <= 2 ? <Instance /> : <Navigate to='/forbidden' replace />,
        },
        {
            path: 'village',
            element: role <= 2 ? <Village /> : <Navigate to='/forbidden' replace />,
        },
        {
            path: 'street',
            element: role <= 2 ? <Street /> : < Navigate to='/forbidden' replace />,
        },
        {
            path: 'category',
            element: role <= 2 ? <Category /> : <Navigate to='/forbidden' replace />,
        },
        {
            path: 'status',
            element: role <= 2 ? <Status /> : <Navigate to='/forbidden' replace />,
        },

    ]
}

export default MainRoutes