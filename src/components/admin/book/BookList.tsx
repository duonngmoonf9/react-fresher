import { useAuthContext } from '@/components/context/AuthContext';
import { getAllBooks } from '@/services/api.service';
import { FORMATE_DATE_VN } from '@/services/helper';
import { DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { App, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import "./styles.scss";



interface ISearch {
    mainText?: string,
    category?: string,
    price?: string,
}

const BookList = () => {
    const actionRef = useRef<ActionType | null>(null);

    const { delay } = useAuthContext();

    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModalAddBook, setOpenModalAddBook] = useState<boolean>(false);
    const [openModalImport, setOpenModalImport] = useState<boolean>(false);
    const [dataDetail, setDataDetail] = useState<IBookGet | null>(null);
    const [dataExport, setDataExport] = useState<IBookGet[]>([]);
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IBookUpdate | null>(null);

    const { message } = App.useApp();

    const columns: ProColumns<IBookGet>[] = [
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
                        // setDataDetail(entity);
                    }}>{entity._id}</a>
                )
            },
        },
        {
            title: 'Ten sach',
            dataIndex: 'mainText',
            copyable: true,
            sorter: true,

            ellipsis: true,
        },
        {
            title: 'The loai',
            dataIndex: 'category',
            sorter: true,


        },
        {
            title: 'Tac gia',
            dataIndex: 'author',
            ellipsis: true,
            hideInSearch: true,
            sorter: true,


        },
        {
            title: 'Gia tien',
            dataIndex: 'price',
            hideInSearch: true,
            sorter: true,

            render: (text) => {
                if (text)
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text)
            }

        },
        {
            title: 'Ngay cap nhat',
            dataIndex: 'updatedAt',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
            render: (dom, entity, index, action, schema) => {
                return (
                    <span>
                        {entity.updatedAt ? dayjs(entity.updatedAt).format(FORMATE_DATE_VN) : '-'}
                    </span>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            hideInSearch: true,
            render: (dom, entity, index, action, schema) => (
                <div className='action-book'>
                    <EditOutlined onClick={() => {
                        setModalUpdate(true);
                        // setDataUpdate(entity)
                    }}
                        className='edit-book' />
                    <Popconfirm
                        title="Delete book"
                        description="Ban co muon xoa book?"
                        // onConfirm={() => handleDelete(entity._id)}
                        onCancel={() => setOpen(false)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                        okButtonProps={{
                            loading: loading
                        }}
                    >
                        <DeleteOutlined className='delete-book' />

                    </Popconfirm>

                </div>
            ),
        }
    ];


    return (
        <ProTable<IBookGet, ISearch>
            className='list-book'
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                let query = "";
                if (params) {
                    query += `current=${params.current}&pageSize=${params.pageSize}`;
                    if (params.mainText) {
                        query += `&mainText=/${params.mainText}/i`;
                    }
                    if (params.category) {
                        query += `&category=/${params.category}/i`;
                    }

                    if (sort && sort.updatedAt) {
                        query += `&sort=${sort.updatedAt === 'ascend' ? "updatedAt" : "-updatedAt"}`
                    } else {
                        query += `&sort=-updatedAt`
                    }

                    if (sort && sort.mainText) {
                        query += `&sort=${sort.mainText === 'ascend' ? "mainText" : "-mainText"}`
                    }

                    if (sort && sort.category) {
                        query += `&sort=${sort.category === 'ascend' ? "category" : "-category"}`
                    }

                    if (sort && sort.price) {
                        query += `&sort=${sort.price === 'ascend' ? "price" : "-price"}`
                    } else {
                        query += `&sort=-price`
                    }


                }
                const res = await getAllBooks(query)

                return {
                    data: res.data?.result as any,
                    page: 1,
                    success: true,
                    total: res.data?.meta.total
                }
            }}
            rowKey="id"
            pagination={{

                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50'],
                defaultPageSize: 5, // Có thể set mặc định ban đầu tại đây
                showTotal: (total, range) => (<div>{range[0]}-{range[1]} trên {total} rows</div>)
            }}
            headerTitle="Book list"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        // reloadList();
                        setOpenModalAddBook(true);
                    }}
                    type="primary"
                >
                    Add new
                </Button>,
                <Button
                    key="button"
                    icon={<ImportOutlined />}
                    onClick={() => {
                        // reloadList();
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
                        filename='export-book.csv'
                    >
                        Export
                    </CSVLink>
                </Button>,
            ]}
        />
    );
};

export default BookList