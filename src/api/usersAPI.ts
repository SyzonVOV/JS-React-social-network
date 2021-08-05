import {GetItemsType, instanceSamuraiJS} from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instanceSamuraiJS.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    }
}