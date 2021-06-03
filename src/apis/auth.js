import axios from 'axios';
import authHeader from './auth-header';
import storage from '../utils/storage';

import API from "./API";

const Auth = {
    login: ( email, password ) => {
        return API
            .post(`/auth/login`, { email, password })
            .then( res => {
                if ( res.data.code === 200) {
                    storage.setStorage('token', res.data.data.token);
                }

                return res.data;

            }).catch( error => error )
    },

    register: ( email, password ) => {
        return API
            .post(`/auth/register`, { email, password })
            .then( res => res.data )
			.catch( error => error )
    },

    validate: token => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, 
				{}, { headers: authHeader( token )}
			)
            .then( res => res.data )
			.catch( err => err )
    },
    
    forgot: email => {
        return API
            .post(`/auth/forgot`, { email })
            .then( res => res.data )
			.catch( err => err )
    },

    reset_password: ( password, token ) => {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/reset_password`, { password }, { headers: authHeader( token )})
            .then( res => res.data )
			.catch( err => err )
    },
	
    validateToken: () => {
        return API
        	.get(`/user/validate_token`)
        	.then( res => res.data )
			.catch( err => err )  
    }
}

export default Auth;