import { getAllUser } from '@/services/api.service';
import { dateRangeValidate, FORMATE_DATE_VN } from '@/services/helper';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import './styles.scss';
import UserDetail from './UserDetail';





const TableUser = () => {

    const actionRef = useRef<ActionType | null>(null);

    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<IGetAllUser | null>(null);

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
                        // setModalUpdate(true);
                        // setDataUpdate(record)
                    }}
                        className='edit-user' />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        // onConfirm={() => handleDelete(record._id)}
                        // onCancel={() => setOpen()}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined className='delete-user' />

                    </Popconfirm>

                </div>
            ),
        }
    ];

    return (
        <>
            <ProTable<IGetAllUser, TSearch>
                className='list-user'
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);

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
                        }
                    }
                    const res = await getAllUser(query);

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
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}
            />
            <UserDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    );
};

export default TableUser;