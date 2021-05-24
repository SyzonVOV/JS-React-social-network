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

export const profileAPI = {
  async getProfile(userId = 12185) {
    let response = await instanceSamuraijs.get(`profile/${ userId }`);
    return response.data;
  },

  async getProfileStatus(userId = 12185) {
    let response = await instanceSamuraijs.get(`profile/status/${ userId }`);
    return response.data;
  },

  async updateProfileStatus(status) {
    let response = await instanceSamuraijs.put(`profile/status/`, { status });
    return response.data;
  },

  async updateAvatar(file) {
    let formData = new FormData();
    formData.append('image', file)
    let response = await instanceSamuraijs.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': `multipart/form-data`
      }});
    return response.data;
  },
  async updateProfileInfo(value) {
    let response = await instanceSamuraijs.put(`profile`, value );
    return response.data;
  },
}

export const followAPI = {
  postFollow(id) {
    return instanceSamuraijs.post(`follow/${ id }`).then(resp => resp.data);
  },
  deleteFollow(id) {
    return instanceSamuraijs.delete(`follow/${ id }`).then(resp => resp.data);
  }
}

export const authAPI = {
  async authMe() {
    let response = await instanceSamuraijs.get(`auth/me`);
    return response.data;
  },
  async login(email, password, remember = false) {
    let response = await instanceSamuraijs.post(`/auth/login`, { email, password, remember });
    return response.data;
  },
  async logout() {
    let response = await instanceSamuraijs.delete(`/auth/login`);
    return response.data;
  }
}
