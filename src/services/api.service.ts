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

export { getAccount, getAllUser, login, logout, register };

