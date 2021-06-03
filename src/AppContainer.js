import React from "react";
import { withRouter } from "react-router";
import auth from './apis/auth';
import constants from './utils/constants';

import API from "./apis/API";

class AppContainer extends React.Component {

	state = { permission: false };

	checkValidity() {
		if ( constants.unauthenticated_url.indexOf(this.props.location.pathname) !== -1) {
			this.setState({ permission: 1 });

		} else {
			auth
				.validateToken()
				.then( response => {
					if ( response.code !== 401 ) {
						this.setState({ permission: 1});
					}
				})
		}
	}

	componentDidMount() {
		this.checkValidity();

		API.interceptors.response.use( res => {
			if ( res.data.code === 401 ) {
				this.setState({ permission: 0 });
				this.props.history.push('/login');
			}

			return res;
		});
	}

	
	render() {
		return this.props.children;
	}
}

export default AppContainer = withRouter(AppContainer);