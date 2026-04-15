import { useAuthContext } from '@/components/context/AuthContext';
import { deleteUser, getAllUser } from '@/services/api.service';
import { dateRangeValidate, FORMATE_DATE_VN } from '@/services/helper';
import { DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { CSVLink } from "react-csv";
import './styles.scss';
import UserAdd from './UserAdd';
import UserDetail from './UserDetail';
import UserImport from './UserImport';
import UserUpdate from './UserUpdate';





const TableUser = () => {

    const actionRef = useRef<ActionType | null>(null);

    const { delay } = useAuthContext();

    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModalAddUser, setOpenModalAddUser] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<IGetAllUser | null>(null);
    const [dataExport, setDataExport] = useState<IGetAllUser[]>([]);
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IUserUpdate | null>(null);

    const { message } = App.useApp();


    type TSearch = {
        fullName?: string;
        email?: string;
        createdAt?: string;
        createdAtRange?: string[];
    }

    const columns: ProColumns<IGetAllUser>[] = [
        {
            title: 'STT',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            render: (text, record, index) => {
                const pageSize = 5; // hoặc lấy từ params
                const current = actionRef.current?.pageInfo?.current || 1;

                return (current - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'ID',
            dataIndex: '_id',
            hideInSearch: true,
            render(dom, entity, index, action, schema) {
                return (
                    <a href="#" onClick={() => {
                        setOpenViewDetail(true);
                        setDataDetail(entity);
                    }}>{entity._id}</a>
                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
            ellipsis: true,
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
            render: (dom, entity, index, action, schema) => {
                return (
                    <span>
                        {entity.createdAt ? dayjs(entity.createdAt).format(FORMATE_DATE_VN) : '-'}
                    </span>
                );
            }
        },
        {
            title: 'Created at',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            hideInSearch: true,
            copyable: true,
        },
        {
            title: 'Action',
            key: 'action',
            hideInSearch: true,

            render: (dom, entity, index, action, schema) => (
                <div className='action-user'>
                    <EditOutlined onClick={() => {
                        setModalUpdate(true);
                        setDataUpdate(entity)
                    }}
                        className='edit-user' />
                    <Popconfirm
                        title="Delete user"
                        description="Ban co muon xoa user?"
                        onConfirm={() => handleDelete(entity._id)}
                        onCancel={() => setOpen(false)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                        okButtonProps={{
                            loading: loading
                        }}
                    >
                        <DeleteOutlined className='delete-user' />

                    </Popconfirm>

                </div>
            ),
        }
    ];

    const handleDelete = async (id: string) => {
        setLoading(true)
        await delay(2000);
        const res = await deleteUser(id);
        if (res.data) {
            message.success("da xoa thanh cong");
            reloadList();
        } else {
            message.error(JSON.stringify(res.message))
        }
        setLoading(false)

    }

    const reloadList = () => {
        actionRef.current?.reload();
    }

    return (
        <>
            <ProTable<IGetAllUser, TSearch>
                className='list-user'
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    // console.log(sort, filter);

                    let query = "";
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`;
                        if (params.email) {
                            query += `&email=/${params.email}/i`;
                        }
                        if (params.fullName) {
                            query += `&fullName=/${params.fullName}/i`;
                        }

                        const createdAtRange = dateRangeValidate(params.createdAtRange);
                        console.log(">>>> createdAtRange", createdAtRange);

                        if (createdAtRange) {
                            query += `&createdAt>=${createdAtRange[0]}&createdAt<=${createdAtRange[1]}`;
                        }

                        if (sort && sort.createdAt) {
                            query += `&sort=${sort.createdAt === 'ascend' ? "createdAt" : "-createdAt"}`
                        } else {
                            query += `&sort=-createdAt`
                        }
                    }
                    const res = await getAllUser(query);
                    if (res.data) {
                        setDataExport(res.data.result ?? []);
                    }

                    return {
                        data: res.data?.result as any,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total
                    }

                }}
                rowKey="_id"
                pagination={{

                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    defaultPageSize: 5, // Có thể set mặc định ban đầu tại đây
                    showTotal: (total, range) => (<div>{range[0]}-{range[1]} trên {total} rows</div>)
                }}

                headerTitle="List user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            reloadList();
                            setOpenModalAddUser(true);
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                    <Button
                        key="button"
                        icon={<ImportOutlined />}
                        onClick={() => {
                            reloadList();
                            setOpenModalImport(true);
                        }}
                        type="primary"
                    >
                        Import
                    </Button>,
                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        type="primary"
                    >

                        <CSVLink
                            data={dataExport}
                            filename='export-user.csv'
                        >
                            Export
                        </CSVLink>
                    </Button>,

                ]}
            />
            <UserDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
            <UserAdd
                reloadList={reloadList}
                setOpenModalAddUser={setOpenModalAddUser}
                openModalAddUser={openModalAddUser}

            />
            <UserImport
                openModalImport={openModalImport}
                setOpenModalImport={setOpenModalImport}
                reloadList={reloadList}
            />

            <UserUpdate
                dataUpdate={dataUpdate} setDataUpdate={setDataUpdate}
                modalUpdate={modalUpdate} setModalUpdate={setModalUpdate}
                reloadList={reloadList}

            />
        </>
    );
};

export default TableUser;