import {GetItemsType, instanceSamuraiJS} from "./api";

export const usersAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: string) {
        let response = await instanceSamuraiJS.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend === '' ? '' : `&friend=${friend}`));
        return response.data;
    }
}