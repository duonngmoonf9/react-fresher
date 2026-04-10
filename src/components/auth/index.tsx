import { Button, Result } from "antd";
import { useAuthContext } from "components/context/AuthContext";
import type React from "react";
import { Link, useLocation } from "react-router-dom";


interface IProps {
    children: React.ReactNode
}

const AuthCheck = ({ children }: IProps) => {
    const { isAuthenticated, user } = useAuthContext();

    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Result
                status="403"
                title="Unauthorized"
                subTitle="ban can phai dang nhap."
                extra={<Button type="primary"><Link to={'/login'}>Dang nhap</Link></Button>}
            />
        )
    }


    if (location.pathname.includes('/admin')) {
        if (user?.role === 'USER') {
            return (
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary"><Link to={'/'}>Ve trang chu</Link></Button>}
                />
            )
        }
    }
    return (
        <>{children}</>
    )
}

export default AuthCheck