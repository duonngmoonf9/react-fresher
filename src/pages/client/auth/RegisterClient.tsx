
import { register } from '@/services/api.service';
import type { FormProps } from 'antd';
import { App, Button, Col, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';




const RegisterClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formRegister] = Form.useForm();

    const navigate = useNavigate();
    const { message } = App.useApp();

    type FieldType = {
        fullName?: string;
        password?: string;
        email?: string;
        phone?: string;
    };


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // console.log('Success:', values);
        setIsLoading(true);

        const res = await register(values);
        if (res.data) {
            message.success('Tao thanh cong, vui long dang nhap')
            navigate('/login');
        } else {
            message.error(JSON.stringify(res.message))
        }
        setIsLoading(false);

    };

    // const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    //     message.error(errorInfo.message);
    // };

    return (
        <Row justify={'center'} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <div className='form-register'>

                    <h2 style={{ textAlign: "center" }}>Dang ky tai khoan</h2>
                    <Divider />
                    <Form
                        layout='vertical'
                        form={formRegister}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item<FieldType>
                            label="Username"
                            name="fullName"
                            rules={[{ required: true, message: 'Trường không được để trống!' },
                            { min: 2, message: "Tối thiểu 2 ký tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
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
                        <Form.Item<FieldType>
                            label="Phone"
                            name="phone"
                            rules={[
                                { required: true, message: 'Trường không được để trống!' },
                                {
                                    pattern: new RegExp(/\d+/g),
                                    message: "không đúng định dạng phone!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Register
                        </Button>
                    </Form>
                    <Divider style={{ borderColor: '#7cb305' }}>Or</Divider>
                    <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                        da co tai khoan? <Link to={'/login'}>dang nhap tai day</Link>
                    </div>
                </div>

            </Col>
        </Row>
    )
}

export default RegisterClient