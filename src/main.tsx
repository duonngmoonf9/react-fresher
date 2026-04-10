import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import './assets/style.scss';
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
                path: "/service",
                element: <>service</>,
                // loader: teamLoader,
            },
            {
                path: "/about",
                element: <>about</>,
                // loader: teamLoader,
            },
        ],
    },
    {
        path: "/Login",
        element: <>login</>,
        // loader: teamLoader,
    },

]);
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <App /> */}
        <RouterProvider router={router} />
    </StrictMode>,
)
