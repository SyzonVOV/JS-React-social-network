import {APIResponseType, instanceSamuraiJS} from "./api";

export const followAPI = {
    postFollow(id: number) {
        return instanceSamuraiJS.post<APIResponseType>(`follow/${id}`).then(resp => resp.data);
    },
    deleteFollow(id: number) {
        return instanceSamuraiJS.delete(`follow/${id}`).then(resp => resp.data) as Promise<APIResponseType>;
    }
}