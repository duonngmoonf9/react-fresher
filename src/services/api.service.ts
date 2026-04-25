import axios from 'services/axios.customize';
const register = (data: object) => {
    const API_URL = `/api/v1/user/register`;
    return axios.post<IBackendRes<IRegister>>(API_URL, data);
}
const login = (data: object) => {
    const API_URL = `/api/v1/auth/login`;
    return axios.post<IBackendRes<ILogin>>(API_URL, data, {
        "headers": {
            delay: 500
        }
    });
}
const logout = () => {
    const API_URL = `/api/v1/auth/logout`;
    return axios.post<IBackendRes<IRegister>>(API_URL);
}

const getAccount = () => {
    const API_URL = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IAccount>>(API_URL);
}

const getAllUser = (query: string) => {
    const API_URL = `/api/v1/user?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IGetAllUser>>>(API_URL);
}

const createUser = (data: object) => {
    const API_URL = `/api/v1/user`;
    return axios.post<IBackendRes<IRegister>>(API_URL, data);
}

const createUserImport = (data: object[]) => {
    const API_URL = `api/v1/user/bulk-create`;
    return axios.post<IBackendRes<IResImportUser>>(API_URL, data);
}

const updateUser = (data: object) => {
    const API_URL = `/api/v1/user`;
    return axios.put<IBackendRes<IUserUpdate>>(API_URL, data);
}

const deleteUser = (id: string) => {
    const API_URL = `/api/v1/user/${id}`;
    return axios.delete<IBackendRes<IAccount>>(API_URL)
}

const getAllBooks = (query: string) => {
    const API_URL = `/api/v1/book?${query}`;
    return axios.get<IBackendRes<IModelPaginate<IBookGet>>>(API_URL);
}


export { createUser, createUserImport, deleteUser, getAccount, getAllBooks, getAllUser, login, logout, register, updateUser };

