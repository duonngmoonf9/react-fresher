import { FORMATE_DATE_VN } from '@/services/helper';
import { Badge, Descriptions, Drawer } from 'antd';
import dayjs from 'dayjs';
interface IUserDetailProps {
    openViewDetail: boolean;
    setOpenViewDetail: (value: boolean) => void;
    dataDetail: IGetAllUser | null;
    setDataDetail: (value: IGetAllUser | null) => void;
}



const UserDetail = (props: IUserDetailProps) => {

    const { openViewDetail, setOpenViewDetail, dataDetail, setDataDetail } = props;


    const onClose = () => {
        setOpenViewDetail(false);
        setDataDetail(null);
    };

    return (
        <>
            <Drawer
                title="Basic Drawer"
                width={"50vw"}
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions title="User Info" bordered column={2} >
                    <Descriptions.Item label="ID">{dataDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataDetail?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={2}>
                        <Badge status="processing" text={dataDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian tạo">{dayjs(dataDetail?.createdAt).format(FORMATE_DATE_VN)}</Descriptions.Item>
                    <Descriptions.Item label="Thời gian sửa">{dayjs(dataDetail?.updatedAt).format(FORMATE_DATE_VN)}</Descriptions.Item>

                </Descriptions>
            </Drawer>
        </>
    );
};



export default UserDetail;