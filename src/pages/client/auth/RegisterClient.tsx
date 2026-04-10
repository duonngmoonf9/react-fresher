
import type { FormProps } from 'antd';
import { Button, Col, Divider, Form, Input, message, Row } from 'antd';
import { Link } from 'react-router-dom';

type FieldType = {
    fullName?: string;
    password?: string;
    email?: string;
    phone?: string;
};


const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(errorInfo.message);
};


const RegisterClient = () => {
    const [formRegister] = Form.useForm();
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
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Username"
                            name="fullName"
                            rules={[{ required: true, message: 'Trường không được để trống!' },
                            { min: 2, message: "Tối thiểu 2 ký tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Trường không được để trống!' },
                            { type: 'email', message: "Chưa đúng định dạng email" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Trường không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
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
                        <Button type="primary" htmlType="submit">
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