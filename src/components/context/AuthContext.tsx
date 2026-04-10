import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    delay: (milSeconds: number) => Promise<boolean>;
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
    user: IUser | null;
    loading: boolean;
    setLoading: (v: boolean) => void;

}

export const AuthContext = createContext<AuthContextType | null>(null);

interface TProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: TProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);

    // 4. Định nghĩa rõ kiểu trả về của hàm delay là Promise<boolean>
    const delay = (milSeconds: number): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, milSeconds);
        });
    };

    return (
        <AuthContext value={{
            delay,
            user, setUser,
            isAuthenticated, setIsAuthenticated,
            loading, setLoading
        }}>
            {children}
        </AuthContext>
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