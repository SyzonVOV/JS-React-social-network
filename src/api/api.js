import * as axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const instanceSamuraijs = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: { 'API-KEY': api_key }
});

export const usersAPI = {
  async getUsers(currentPage = 1, pageSize = 10) {
    let response = await instanceSamuraijs.get(`users?page=${ currentPage }&count=${ pageSize }`);
    return response.data;
  }
}

export const followAPI = {
  postFollow(id) {
    return instanceSamuraijs.post(`follow/${id}`).then(resp => resp.data);
  },
  deleteFollow(id) {
    return instanceSamuraijs.delete(`follow/${id}`).then(resp => resp.data);
  }
}
