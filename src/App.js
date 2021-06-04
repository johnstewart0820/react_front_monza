import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { pl } from 'date-fns/locale'
import LuxonUtils from '@date-io/luxon';
import { ToastProvider } from 'react-toast-notifications';

import { chartjs } from './helpers';
import theme from './theme';
import validators from './common/validators';
import { AuthContextProvider } from "./context/AuthContext";

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
	draw: chartjs.draw
});

validate.validators = {
	...validate.validators,
	...validators
};

export default class App extends Component {
	render() {
		return (
			<MuiPickersUtilsProvider utils={LuxonUtils} locale={pl}>
				<ToastProvider>
					<ThemeProvider theme={theme()}>
						<Router history={browserHistory}>
							<AuthContextProvider/>
						</Router>
					</ThemeProvider>
				</ToastProvider>
			</MuiPickersUtilsProvider>
		);
	}
}
