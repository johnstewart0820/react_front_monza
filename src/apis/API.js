import axios from "axios";
import storage from "utils/storage";

const API = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL
})

API.interceptors.request.use( config => {
	config.params = config.params || {};
	config.headers.Authorization = 'Bearer ' + storage.getStorage('token');
    return config;
});

export default API;