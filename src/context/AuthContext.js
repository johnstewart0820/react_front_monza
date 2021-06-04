import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

import PATHS from "routes/paths";
import API from "apis/API";
import Auth from "apis/auth";
import storage from "utils/storage";

import Loader from "components/Loader";
import { LoggedRoutes, UnLoggedRoutes } from "../routes/Routes";


const AuthContext = React.createContext();

export const AuthContextProvider = () => {

	const history = useHistory();
	const [ loading, setLoading ] = useState( true );
	const [ logged, setLogged ] = useState( false );

	const Routes = useMemo(() => logged ? LoggedRoutes : UnLoggedRoutes, [ logged ]);

	const logIn = () => {
		setLogged( true );
		history.push( PATHS.Assortment );
	}

	const logOut = () => {
		storage.removeStorage("token");
		storage.removeStorage("role");
		setLogged( false );
	}

	const checkIsTokenValid = () => {

		if ( storage.getStorage("token")) {
			Auth
				.validateToken()
				.then( response => {
					if ( response.code === 200 ) {
						setLogged( true );
						setLoading( false );
					}
				})
		} else {
			setLoading( false );
		}
	}

	useEffect(() => {
		
		API.interceptors.response.use( res => {
			
			if ( res.data.code === 401 ) logOut();
			return res;
		});

		checkIsTokenValid();

	}, []);


	return (
		<AuthContext.Provider value={{
			logIn: () => logIn(),
			logOut: () => logOut()
		}}>
			{ loading && <Loader style={{ height: "100vh", background: "#f4f6f8" }}/> }
			{ !loading && <Routes/> }
		</AuthContext.Provider>
	)
}

export default AuthContext;