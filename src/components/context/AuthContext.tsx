import { createContext, ReactNode } from "react";

// 1. Định nghĩa kiểu dữ liệu (interface) cho những gì Context sẽ cung cấp
interface AuthContextType {
    delay: (milSeconds: number) => Promise<boolean>;
}

// 2. Truyền interface vào createContext
export const AuthContext = createContext<AuthContextType | null>(null);

// 3. Định nghĩa kiểu dữ liệu cho props của Provider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    // 4. Định nghĩa rõ kiểu trả về của hàm delay là Promise<boolean>
    const delay = (milSeconds: number): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, milSeconds);
        });
    };

    // 5. Sử dụng AuthContext.Provider và truyền value vào
    return (
        <AuthContext.Provider value={{ delay }}>
            {children}
        </AuthContext.Provider>
    );
};