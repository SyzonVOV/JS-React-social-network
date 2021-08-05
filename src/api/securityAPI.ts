import {instanceSamuraiJS} from "./api";

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    async getCaptchaUrl() {
        let response = await instanceSamuraiJS.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`);
        return response.data;
    }
}