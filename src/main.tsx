import App from '@/App';
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
const rootLoader = async () => {
    return { message: "Hello from loader" };
};
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
                // loader: teamLoader,
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
        <RouterProvider router={router} />
    </StrictMode>,
)
