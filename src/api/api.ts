import axios from "axios";
import {TUser} from "../types";

const api_key = process.env.REACT_APP_API_KEY;

export enum EResultCodes {
    Success = 0,
    Error = 1,
    Captcha = 10
}

export const instanceSamuraiJS = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': api_key}
});

export type GetItemsType = {
    items: Array<TUser>
    totalCount: number
    error: string | null
};

export type APIResponseType<D = {}, RC = EResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}