import {APIResponseType, instanceSamuraiJS} from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}

export const authAPI = {
    async authMe() {
        let response = await instanceSamuraiJS.get<APIResponseType<MeResponseDataType>>(`auth/me`);
        return response.data;
    },
    async login(email: string, password: string, remember = false, captcha: null | string = null) {
        let response = await instanceSamuraiJS.post<APIResponseType<LoginResponseDataType>>(`auth/login`, {email, password, remember, captcha});
        return response.data;
    },
    async logout() {
        let response = await instanceSamuraiJS.delete(`auth/login`);
        return response.data;
    }
}