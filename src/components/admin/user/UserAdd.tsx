import { createUser } from '@/services/api.service';
import { App, Col, Divider, Form, Input, Modal, Row } from 'antd';
import type { FormProps } from 'antd/lib';

interface IAddUser {
    setOpenModalAddUser: (value: boolean) => void,
    reloadList: () => void,
    openModalAddUser: boolean
}

const UserAdd = (props: IAddUser) => {
    const { openModalAddUser, setOpenModalAddUser, reloadList } = props;
    const [formCreateUser] = Form.useForm();

    const { message } = App.useApp();

    type FieldType = {
        fullName?: string;
        password?: string;
        email?: string;
        phone?: string;
    };


    const handleCancel = () => {
        setOpenModalAddUser(false);
        formCreateUser.resetFields();
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const data = {
            "fullName": values.fullName,
            "password": values.password,
            "email": values.email,
            "phone": values.phone
        }
        const res = await createUser(data);
        if (res.data) {
            message.success('da them user');
            reloadList();
            formCreateUser.resetFields();
            setOpenModalAddUser(false);
        } else {
            message.error(JSON.stringify(res.message))
        }
    }
    return (
        <>
            <Modal
                title="Add User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={openModalAddUser}
                onOk={() => formCreateUser.submit()}
                onCancel={handleCancel}
                okText="Them moi"
                cancelText="huy"
            >
                <Row justify={'center'} style={{ marginTop: "30px" }}>
                    <Col xs={24} md={24} lg={24}>

                        <h2 style={{ textAlign: "center" }}>Them user</h2>
                        <Divider />
                        <Form
                            layout='vertical'
                            form={formCreateUser}
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
                        </Form>

                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default UserAdd