
import { useAuthContext } from '@/components/context/AuthContext';
import { login } from '@/services/api.service';
import type { FormProps } from 'antd';
import { App, Button, Col, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';




const LoginClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formLogin] = Form.useForm();

    const { setIsAuthenticated, setUser } = useAuthContext();

    const navigate = useNavigate();
    const { message } = App.useApp();

    type FieldType = {
        password?: string;
        username?: string;
    };


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        const data = {
            "username": values.username,
            "password": values.password
        }
        const res = await login(data);
        if (res.data) {
            localStorage.setItem('access_token', res.data.access_token);
            message.success('Dang nhap thanh cong')
            setIsAuthenticated(true);
            setUser(res.data.user);
            navigate('/');
        } else {
            message.error(JSON.stringify(res.message))
        }
        setIsLoading(false);

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error(errorInfo.message);
    };

    return (
        <Row justify={'center'} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <div className='form-register'>

                    <h2 style={{ textAlign: "center" }}>Dang nhap</h2>
                    <Divider />
                    <Form
                        layout='vertical'
                        form={formLogin}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            label="Email"
                            name="username"
                            rules={[{ required: true, message: 'Trường không được để trống!' },
                            { type: 'email', message: "Chưa đúng định dạng email" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Trường không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Login
                        </Button>
                    </Form>
                    <Divider style={{ borderColor: '#7cb305' }}>Or</Divider>
                    <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                        chưa co tai khoan? <Link to={'/register'}>dang ky ngay</Link>
                    </div>
                </div>

            </Col>
        </Row>
    )
}

export default LoginClient