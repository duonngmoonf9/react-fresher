import { useAuthContext } from "components/context/AuthContext";
import AppFooter from "components/layout/AppFooter";
import AppHeader from "components/layout/AppHeader";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { getAccount } from "services/api.service";

function App() {
    let [color, setColor] = useState("#379bd4");
    const { setIsAuthenticated, setUser, loading, setLoading, delay } = useAuthContext();

    useEffect(() => {
        const fetchGetAccount = async () => {
            const res = await getAccount();
            if (res.data) {
                setIsAuthenticated(true);
                setUser(res.data.user);
            }
            await delay(500);
            setLoading(false)
        }
        fetchGetAccount();
    }, [])
    return (
        <>
            {loading === true ?
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                    <RingLoader
                        color={color}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"

                    />
                </div>
                :
                <>
                    <AppHeader />
                    <Outlet />
                    <AppFooter />
                </>
            }


        </>)
}

export default App
