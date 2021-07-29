import axios from "axios";
import {TProfile} from "../types";

const api_key = process.env.REACT_APP_API_KEY;

export enum EResultCodes {
    Success = 0,
    Error = 1,
    Captcha = 10
}

type TAuthMe = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: EResultCodes
    messages: Array<string>
}

type TAuthLogin = {
    data: {
        useId: number
    }
    resultCode: EResultCodes
    messages: Array<string>
}

const instanceSamuraiJS = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': api_key}
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instanceSamuraiJS.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    }
}

export const profileAPI = {
    async getProfile(userId = 12185) {
        let response = await instanceSamuraiJS.get(`profile/${userId}`);
        return response.data;
    },

    async getProfileStatus(userId = 12185) {
        let response = await instanceSamuraiJS.get(`profile/status/${userId}`);
        return response.data;
    },

    async updateProfileStatus(status: string) {
        let response = await instanceSamuraiJS.put(`profile/status/`, {status});
        return response.data;
    },

    async updateAvatar(file: any) {
        let formData = new FormData();
        formData.append('image', file)
        let response = await instanceSamuraiJS.put(`profile/photo`, formData, {
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

export const followAPI = {
    postFollow(id: number) {
        return instanceSamuraiJS.post(`follow/${id}`).then(resp => resp.data);
    },
    deleteFollow(id: number) {
        return instanceSamuraiJS.delete(`follow/${id}`).then(resp => resp.data);
    }
}

export const authAPI = {
    async authMe() {
        let response = await instanceSamuraiJS.get<TAuthMe>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, remember = false, captcha: null | string = null) {
        let response = await instanceSamuraiJS.post<TAuthLogin>(`auth/login`, {email, password, remember, captcha});
        return response.data;
    },
    async logout() {
        let response = await instanceSamuraiJS.delete(`auth/login`);
        return response.data;
    }
}
export const securityAPI = {
    async getCaptchaUrl() {
        let response = await instanceSamuraiJS.get(`security/get-captcha-url`);
        return response.data;
    }
}
