import App from '@/App';
import { App as AppAntd } from 'antd';
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
import { getAccount } from './services/api.service';
const rootLoader = async () => {
    return { message: "Hello from loader" };
};
const loadAccount = async () => {
    const res = await getAccount();
    if (res.data) {
        return res.data.user;
    }
    return;
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: rootLoader,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "/home",
                element: <HomePage />,
                loader: loadAccount,
            },
            {
                path: "/about",
                element: <AboutPage />,
                // loader: teamLoader,
            },
            {
                path: "/book",
                element: <BookPage />,
                // loader: teamLoader,
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
            <RouterProvider router={router} />
        </AppAntd>
    </StrictMode>,
)
