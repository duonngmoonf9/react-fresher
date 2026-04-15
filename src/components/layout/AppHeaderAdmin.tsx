import { logout } from '@/services/api.service';
import {
    AppstoreOutlined,
    DollarCircleOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { App, Avatar, Dropdown, Layout, Menu, Space } from 'antd';
import { useAuthContext } from 'components/context/AuthContext';
import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import AuthCheck from '../auth';
type MenuItem = Required<MenuProps>['items'][number];

const { Content, Footer, Sider } = Layout;


const AppHeaderAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const { user, setIsAuthenticated, setUser } = useAuthContext();

    const navigate = useNavigate();
    const { message } = App.useApp();

    const handleLogout = async () => {
        const res = await logout();
        if (res.data) {
            localStorage.removeItem("access_token");
            setIsAuthenticated(false);
            setUser(null);
            navigate('/');
        } else {
            message.error('loi dang xuat');
        }

    }

    const items: MenuItem[] = [
        {
            label: <Link to='/admin'>Dashboard</Link>,
            key: 'dashboard',
            icon: <AppstoreOutlined />
        },
        {
            label: <span>Manage Users</span>,
            key: 'user',
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to='/admin/user'>CRUD</Link>,
                    key: 'crud',
                    icon: <TeamOutlined />,
                },
                // {
                //     label: 'Files1',
                //     key: 'file1',
                //     icon: <TeamOutlined />,
                // }
            ]
        },
        {
            label: <Link to='/admin/book'>Manage Books</Link>,
            key: 'book',
            icon: <ExceptionOutlined />
        },
        {
            label: <Link to='/admin/order'>Manage Orders</Link>,
            key: 'order',
            icon: <DollarCircleOutlined />
        },

    ];

    const itemsDropdown = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => alert("me")}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    return (
        <>
            <AuthCheck>
                <Layout
                    style={{ minHeight: '100vh' }}
                    className="layout-admin"
                >
                    <Sider
                        theme='light'
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
                        <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                            Admin
                        </div>
                        <Menu
                            defaultSelectedKeys={[activeMenu]}
                            mode="inline"
                            items={items}
                            onClick={(e) => setActiveMenu(e.key)}
                        />
                    </Sider>
                    <Layout>
                        <div className='admin-header' style={{
                            height: "50px",
                            borderBottom: "1px solid #ebebeb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0 15px",

                        }}>
                            <span>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })}
                            </span>
                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <Space style={{ cursor: "pointer" }}>
                                    <Avatar src={urlAvatar} />
                                    {user?.phone}
                                </Space>
                            </Dropdown>
                        </div>
                        <Content style={{ padding: '15px' }}>
                            <Outlet />
                        </Content>
                        <Footer style={{ padding: 0, textAlign: "center" }}>
                            React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                        </Footer>
                    </Layout>
                </Layout>
            </AuthCheck>

        </>
    );
};

export default AppHeaderAdmin;