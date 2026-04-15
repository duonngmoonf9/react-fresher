import { updateUser } from '@/services/api.service';
import { App, Col, Divider, Form, Input, Modal, Row } from 'antd';
import type { FormProps } from 'antd/lib';
import { useEffect } from 'react';

interface IUpdateUser {
    setModalUpdate: (value: boolean) => void,
    modalUpdate: boolean,
    setDataUpdate: (value: IUserUpdate | null) => void;
    dataUpdate: IUserUpdate | null;
    reloadList: () => void,
}

const UserUpdate = (props: IUpdateUser) => {
    const { modalUpdate, setModalUpdate, reloadList, dataUpdate, setDataUpdate } = props;
    const [formUpdateUser] = Form.useForm();

    const { message } = App.useApp();

    type FieldType = {
        id?: string;
        fullName?: string;
        email?: string;
        phone?: string;
    };

    //cau hinh tu dong dien du lieu vao form
    useEffect(() => {
        if (dataUpdate) {
            formUpdateUser.setFieldsValue({
                id: dataUpdate._id,
                email: dataUpdate.email,
                fullName: dataUpdate.fullName,
                phone: dataUpdate.phone,
            })
        } else {
            return
        }
    }, [dataUpdate]);

    const handleCancel = () => {
        setModalUpdate(false);
        setDataUpdate(null);
        formUpdateUser.resetFields();
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const data = {
            "_id": dataUpdate?._id,
            "fullName": values.fullName,
            "phone": values.phone
        }
        const res = await updateUser(data);
        if (res.data) {
            message.success('da update user');
            reloadList();
            formUpdateUser.resetFields();
            setDataUpdate(null)
            setModalUpdate(false);
        } else {
            message.error(JSON.stringify(res.message))
        }
    }
    return (
        <>
            <Modal
                title="User update"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={modalUpdate}
                onOk={() => formUpdateUser.submit()}
                onCancel={handleCancel}
                okText="Luu"
                cancelText="huy"
            >
                <Row justify={'center'} style={{ marginTop: "30px" }}>
                    <Col xs={24} md={24} lg={24}>

                        <h2 style={{ textAlign: "center" }}>Update user</h2>
                        <Divider />
                        <Form
                            layout='vertical'
                            form={formUpdateUser}
                            onFinish={onFinish}
                            autoComplete="off"
                        >

                            <Form.Item<FieldType>
                                hidden
                                label="ID"
                                name="id"

                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label="Email"
                                name="email"

                            >
                                <Input disabled />
                            </Form.Item>
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

export default UserUpdate