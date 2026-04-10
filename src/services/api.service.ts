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
const getAccount = () => {
    const API_URL = `/api/v1/auth/account`;
    return axios.get<IBackendRes<IAccount>>(API_URL);
}
export { getAccount, login, register };

