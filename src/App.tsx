import { Outlet, useLoaderData } from "react-router-dom";
import AppFooter from "./components/layout/AppFooter";
import AppHeader from "./components/layout/AppHeader";

function App() {
    const data = useLoaderData() as { message: string };
    return (
        <>
            {/* <div>chao sep duong</div>
            <div>{data.message}</div> */}
            <AppHeader />
            <Outlet />
            <AppFooter />

        </>)
}

export default App
