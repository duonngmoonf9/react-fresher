import App from '@/App';
import { App as AppAntd } from 'antd';
import { AuthProvider } from 'components/context/AuthContext';
import AboutPage from 'pages/client/AboutPage.tsx';
import BookPage from 'pages/client/BookPage.tsx';
import HomePage from 'pages/client/HomePage.tsx';
import LoginClient from 'pages/client/auth/LoginClient.tsx';
import RegisterClient from 'pages/client/auth/RegisterClient.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import 'styles/global.scss';
import AuthCheck from './components/auth';

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
                element: <AuthCheck ><div>checkout</div></AuthCheck>
            },
            {
                path: "/admin",
                element: <AuthCheck ><div>admin pages</div></AuthCheck>
            },
        ],
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
    <StrictMode>
        {/* <App /> */}
        <AppAntd>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </AppAntd>
    </StrictMode>,
)
