
import { InboxOutlined } from '@ant-design/icons';
import type { TableProps, UploadProps } from 'antd';

import { message, Modal, Table, Upload } from 'antd';


interface IUserImport {
    setOpenModalImport: (value: boolean) => void,
    openModalImport: boolean
}
const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",

    customRequest({ file, onSuccess }) {
        setTimeout(() => {
            if (onSuccess) onSuccess("OK");
        }, 1000);
    },

    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};



interface DataType {
    fullName?: string;
    email?: string;
    phone?: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Tên hiển thị',
        dataIndex: 'fullName',
        key: 'fullName',

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
    },
];



const data: DataType[] = [];


const UserImport = (props: IUserImport) => {
    const { openModalImport, setOpenModalImport } = props;
    const handleCancel = () => {
        setOpenModalImport(false);
    }
    return (
        <Modal
            title="Add User"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={openModalImport}
            // onOk={() => formCreateUser.submit()}
            onCancel={handleCancel}
            okText="import"
            cancelText="huy"
            width={"700px"}
        >
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
            <Table<DataType> title={() => <span>Du lieu upload:</span>} columns={columns} dataSource={data} style={{ marginTop: "20px", alignItems: "center" }} />
        </Modal>


    )
}

export default UserImport