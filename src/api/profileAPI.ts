import {TPhoto, TProfile} from "../types";
import {APIResponseType, instanceSamuraiJS} from "./api";

type SavePhotoResponseDataType = {
    photos: TPhoto
}

export const profileAPI = {
    async getProfile(userId = 12185) {
        let response = await instanceSamuraiJS.get<TProfile>(`profile/${userId}`);
        return response.data;
    },

    async getProfileStatus(userId = 12185) {
        let response = await instanceSamuraiJS.get<string>(`profile/status/${userId}`);
        return response.data;
    },

    async updateProfileStatus(status: string) {
        let response = await instanceSamuraiJS.put<APIResponseType>(`profile/status/`, {status});
        return response.data;
    },

    async updateAvatar(file: any) {
        let formData = new FormData();
        formData.append('image', file)
        let response = await instanceSamuraiJS.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': `multipart/form-data`
            }
        });
        return response.data;
    },
    async updateProfileInfo(value: TProfile) {
        let response = await instanceSamuraiJS.put(`profile`, value);
        return response.data;
    },
}