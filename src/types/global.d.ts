export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[]; // co neu loi
        message: string;
        statusCode: number | string;
        data?: T; //co neu thanh cong
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        }
        result: T[]
    }

    interface ILogin {
        access_token: string;
        user: {
            email: string;
            phone: string;
            fullName: string;
            role: string;
            avatar: string;
            id: string
        }
    }
    interface IRegister {
        statusCode: number;
        message: string;
        data: {
            _id: string;
            email: string;
            fullName: string
        }
    }

    interface IUser {
        email: string;
        phone: string;
        fullName: string;
        role: string;
        avatar: string;
        id: string
    }

    interface IAccount {
        user: IUser
    }

    interface IGetAllUser {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        role: string;
        avatar: string;
        isActive: boolean;
        type: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IResImportUser {
        countSuccess: number;
        countError: number;
        detail: string;
    }
}


