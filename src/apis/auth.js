import axios from 'axios';
import authHeader from './auth-header';
import storage from '../utils/storage';

import API from "./API";

const Auth = {
    login: ( email, password ) => {
        return API
            .post(`/auth/login`, { email, password })
            .then( data => {

                if ( data.code === 200) {
                    storage.setStorage('token', data.data.token);
                }

                return data;
            })
    },

    register: ( email, password ) => API.post(`/auth/register`, { email, password }),

    validate: token => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {}, { 
				headers: authHeader( token )
			})
            .then( res => res.data )
			.catch( err => err )
    },
    
    forgot: email => API.post(`/auth/forgot`, { email }),

    reset_password: ( password, token ) => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/reset_password`, { password }, { headers: authHeader( token )})
            .then( res => res.data )
			.catch( err => err )
    },
	
    validateToken: () => API.get(`/user/validate_token`)
}

export default Auth;