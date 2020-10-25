import * as axios from "axios";

const addressAPI = 'https://social-network.samuraijs.com/api/1.0';

export const getUsers = (currentPage = 1, pageSize = 10) => {
 return axios.get(`${ addressAPI }/users?page=${ currentPage }&count=${ pageSize }`,
    {withCredentials: true
    })
}
