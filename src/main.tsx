import App from '@/App';
import { enUSIntl, ProConfigProvider } from '@ant-design/pro-components';
import { App as AppAntd, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import AuthCheck from 'components/auth';
import { AuthProvider } from 'components/context/AuthContext';
import AppHeaderAdmin from 'components/layout/AppHeaderAdmin';
import AboutPage from 'pages/client/AboutPage.tsx';
import BookPage from 'pages/client/BookPage.tsx';
import HomePage from 'pages/client/HomePage.tsx';
import LoginClient from 'pages/client/auth/LoginClient.tsx';
import RegisterClient from 'pages/client/auth/RegisterClient.tsx';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import 'styles/global.scss';
import DashBoardPage from './pages/admin/dashboard';
import ManageBookPage from './pages/admin/manage.book';
import ManageOrderPage from './pages/admin/manage.order';
import ManageUserPage from './pages/admin/manage.user';

// const loadAccount = async () => {
//     const res = await getAccount();
//     if (res.data) {
//         return { user: res.data };
//     }
//     return { user: null };
// }
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/about",
                element: <AboutPage />,
            },
            {
                path: "/book",
                element: <BookPage />,
            },
            {
                path: "/checkout",
                element: (
                    <AuthCheck>
                        <div>checkout page</div>
                    </AuthCheck>
                ),
            }
        ],
    },
    {
        path: "admin",
        element: <AppHeaderAdmin />,
        children: [
            {
                index: true,
                element: (
                    <AuthCheck>
                        <DashBoardPage />
                    </AuthCheck>
                )
            },
            {
                path: "book",
                element: (
                    <AuthCheck>
                        <ManageBookPage />
                    </AuthCheck>
                )
            },
            {
                path: "order",
                element: (
                    <AuthCheck>
                        <ManageOrderPage />
                    </AuthCheck>
                )
            },
            {
                path: "user",
                element: (
                    <AuthCheck>
                        <ManageUserPage />
                    </AuthCheck>
                ),
            },
            {
                path: "/admin",
                element: (
                    <AuthCheck>
                        <div>admin page</div>
                    </AuthCheck>
                ),
            },

        ]
    },
    {
        path: "/Login",
        element: <LoginClient />
        // loader: teamLoader,
    },
    {
        path: "/register",
        element: <RegisterClient />
        // loader: teamLoader,
    },

]);
createRoot(document.getElementById('root')!).render(
    <AppAntd>
        <AuthProvider>
            <ConfigProvider locale={enUS}>
                <ProConfigProvider intl={enUSIntl}>
                    <RouterProvider router={router} />
                </ProConfigProvider>
            </ConfigProvider>
        </AuthProvider >
    </AppAntd>
)
