import React, { useEffect, useState, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

import PATHS from "routes/paths";
import API from "apis/API";
import Auth from "apis/auth";
import storage from "utils/storage";
import { getPageTitle, LoggedRoutes, UnLoggedRoutes } from "../routes/Routes";

import { Loader } from "components";
import { Main as MainLayout, Minimal as MinimalLayout } from "layouts";


const AuthContext = React.createContext();

export const AuthContextProvider = () => {

	const history = useHistory();
	const location = useLocation();

	const [ loading, setLoading ] = useState( true );
	const [ logged, setLogged ] = useState( false );

	const Routes = useMemo(() => logged ? LoggedRoutes : UnLoggedRoutes, [ logged ]);
	const Layout = useMemo(() => logged ? MainLayout : MinimalLayout, [ logged ]);
	const page_title = useMemo(() => logged ? getPageTitle( location.pathname) : "", [ logged, location.pathname ]);


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
		storage.getStorage("token")
			? Auth
				.validateToken()
				.then( response => {
					if ( response.code === 200 ) {
						setLogged( true );
						setLoading( false );
					}
				})
			: setLoading( false );
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
			{ !loading && 
				<Layout title={ page_title }> 
					<Routes/> 
				</Layout> 
			}
		</AuthContext.Provider>
	)
}

export default AuthContext;