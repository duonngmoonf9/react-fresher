import { getAccount } from "@/services/api.service";
import React, { createContext, useContext, useEffect, useState } from "react";
import { RingLoader } from "react-spinners";

interface AuthContextType {
    delay: (milSeconds: number) => Promise<boolean>;
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser | null) => void;
    user: IUser | null;
    loading: boolean;
    setLoading: (v: boolean) => void;

}

export const AuthContext = createContext<AuthContextType | null>(null);

interface IProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
    const [color, setColor] = useState("#379bd4");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);


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



    // 4. Định nghĩa rõ kiểu trả về của hàm delay là Promise<boolean>
    const delay = (milSeconds: number): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, milSeconds);
        });
    };

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
                    <AuthContext value={{
                        delay,
                        user, setUser,
                        isAuthenticated, setIsAuthenticated,
                        loading, setLoading,
                    }}>
                        {children}
                    </AuthContext>
                </>
            }
        </>
    );
};

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "authContext has to be used within <AuthContext.Provider>"
        );
    }

    return authContext;
};