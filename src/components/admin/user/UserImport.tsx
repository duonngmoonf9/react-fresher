
import { createUserImport } from '@/services/api.service';
import { InboxOutlined } from '@ant-design/icons';
import type { TableProps, UploadProps } from 'antd';

import { App, Modal, Table, Upload } from 'antd';
import templateFile from "assets/template/user.xlsx?url";
import ExcelJS from 'exceljs';
import { useState } from 'react';



interface IUserImport {
    setOpenModalImport: (value: boolean) => void,
    openModalImport: boolean
    reloadList: () => void,
}
interface IDataImport {
    fullName: string;
    email: string;
    phone: string;
}
const { Dragger } = Upload;


const UserImport = (props: IUserImport) => {
    const [dataImport, setDataImport] = useState<IDataImport[]>([]);
    const [loading, isLoading] = useState<boolean>(false);

    const { openModalImport, setOpenModalImport, reloadList } = props;
    const { message } = App.useApp();

    const columns: TableProps<IDataImport>['columns'] = [
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

    const propsUpload: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",

        //hàm này đánh lừa antd rằng chúng ta upload file rồi
        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                if (onSuccess) onSuccess("OK");
            }, 1000);
        },


        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;

                    let jsonData: IDataImport[] = [];
                    if (file) {
                        //load buffer =>chuyen qua dang mang
                        const workbook = new ExcelJS.Workbook();
                        const arrayBuffer = await file.arrayBuffer();
                        await workbook.xlsx.load(arrayBuffer);

                        //convert file to Json
                        workbook.worksheets.forEach((sheet) => {
                            let firstRow = sheet.getRow(1);
                            if (!firstRow.cellCount) return;
                            let keys = firstRow.values as any[];
                            sheet.eachRow((row, rowNumber) => {
                                if (rowNumber == 1) return;
                                let values = row.values as any
                                let obj: any = {};
                                for (let i = 1; i < keys.length; i++) {
                                    obj[keys[i]] = values[i];
                                }
                                jsonData.push(obj);
                            });
                        });

                    }
                    jsonData.map((item, index) => {
                        return {
                            ...item,
                            id: index + 1
                        }
                    })
                    setDataImport(jsonData)
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    // console.log(">>>> dataImport", Array.isArray(dataImport));


    const handleCancel = () => {
        setOpenModalImport(false);
        setDataImport([]);
    }
    const handleSubmitImport = async () => {
        isLoading(true);
        const data = dataImport.map((item) => ({
            'fullName': item.fullName,
            'email': item.email,
            'phone': item.phone,
            'password': import.meta.env.VITE_PASS_USER_DETAIL
        }));
        console.log(">>>> data", Array.isArray(data));

        const res = await createUserImport(data);
        if (res.data && res.data.countSuccess) {
            message.success(`da import ${res.data.countSuccess} user, va chua import ${res.data.countError} `)
            setOpenModalImport(false);
            setDataImport([]);
            reloadList();
        } else {
            message.error(`khong the import ${res.data?.countError} do user da ton tai`)

        }
        isLoading(false)
    }
    return (
        <Modal
            title="Add User"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={openModalImport}
            onOk={() => handleSubmitImport()}
            onCancel={handleCancel}
            okText="import"
            cancelText="huy"
            width={"700px"}
            okButtonProps={{
                disabled: dataImport.length > 0 ? false : true,
                loading: loading
            }}
            maskClosable={false}
            destroyOnHidden={true}

        >
            <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for uploading XLSX, CSV, and Excel files. Please ensure files contain columns: fullName, email, phone. or <a onClick={(e) => e.stopPropagation()} href={templateFile} download >Dowload sample file</a>
                </p>
            </Dragger>
            <Table<IDataImport> title={() => <span>Du lieu upload:</span>} rowKey={"id"} columns={columns} dataSource={dataImport} style={{ marginTop: "20px", }} />
        </Modal >


    )
}

export default UserImport