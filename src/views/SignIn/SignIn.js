import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Button,
	Link,
	FormControlLabel,
	Checkbox,
	Typography
} from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import clsx from 'clsx';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import { ProgressBar } from 'components';
import auth from '../../apis/auth';
import storage from 'utils/storage';
import constants from '../../utils/constants';
import { useToasts } from 'react-toast-notifications'
import AuthContext from 'context/AuthContext';
import PATHS from 'routes/paths';

const SignIn = props => {
	const { history } = props;

	const logIn = useContext( AuthContext ).logIn;
	const classes = useStyles();
	const global_classes = useGlobalStyles();
	const [ checkStatus, setCheckStatus] = useState(false);
	const [ input, setInput] = useState({});
	const [ error, setError] = useState({});
	const [ progressStatus, setProgressStatus] = useState(false);
	const [ tryLogin, setTryLogin] = useState(false);
  	const { addToast } = useToasts()

	const handleChange = event => {
		let arr = JSON.parse(JSON.stringify(input));
		arr[event.target.name] = event.target.value;
		setInput(arr);
	};

	const handleRememberMe = event => {
		setCheckStatus(!checkStatus);
	};

	const handleSignIn = event => {
		setTryLogin(true);
		if ((error && ((error.email && error.email.length > 0) || (error.password && error.password.length > 0))) || !input.email || !input.password) {
			addToast(constants.CHECK_ALL_FIELDS, { appearance: 'success', autoDismissTimeout: 5000, autoDismiss: true});
		} else {
			setProgressStatus(true);
			if (checkStatus) {
				storage.setStorage('email', input.email);
				storage.setStorage('password', input.password);
			} else {
				storage.removeStorage('email');
				storage.removeStorage('password');
			}
			auth
				.login(input.email, input.password)
				.then(response => {
					if (response.code === 200) {
						setProgressStatus(false);
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })

						logIn();

					} else {
						setProgressStatus(false);
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
					}
				})
		}
	};
	useEffect(() => {
		let arr = JSON.parse(JSON.stringify(input));
		if (storage.getStorage('email') && storage.getStorage('email').length > 0) {
			arr['email'] = storage.getStorage('email');
		}
		if (storage.getStorage('password') && storage.getStorage('password').length > 0) {
			arr['password'] = storage.getStorage('password');
		}
		setInput(arr);
	}, []);
	useEffect(() => {
		let arr = JSON.parse(JSON.stringify(error));
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		if (input["email"] && !pattern.test(input["email"])) {
			arr["email"] = constants.ENTER_VALID_EMAIL;
		} else {
			arr["email"] = "";
		}
		if (input["password"] && input["password"].length <= 5) {
			arr["password"] = constants.ENTER_PASSWORD;
		} else {
			arr["password"] = "";
		}

		setError(arr);
	}, [input]);

	const handleKeyPress = (event) => {
		if (event.charCode === 13) {
			handleSignIn();
		}
	}
	return (
		<>
			<div className={classes.root}>
				<div className={classes.loginForm}>
					<Typography variant={"h2"} className={clsx(classes.description, global_classes.normal_font)}>
						Witamy w aplikacji internetowej ???MonZa Edu" przeznaczonej do nauczania w zakresie magazynowania w zawodzie technik logistyk!
					</Typography>
					<Typography variant={"h2"} className={clsx(classes.title, global_classes.normal_font)}>
						Zaloguj si??, aby rozpocz???? korzystanie z aplikacji.
					</Typography>
					<Typography variant={"h2"} className={clsx(classes.title, global_classes.normal_font)}>
						Je??eli nie posiadasz konta wybierz opcj?? "Zarejestruj si??".
					</Typography>
					<div className={classes.form}>
						<div className={classes.input_box_label}>Login</div>
						<input className={classes.input_box} aria-label="e-mail" type="email" value={input.email} name="email" id="email" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' />
						<div className={classes.error_log}>{tryLogin && error["email"] && error["email"].length > 0 && error.email}</div>
						<div className={classes.input_box_label}><label htmlFor="password">Has??o</label></div>
						<input className={classes.input_box} type="password" value={input.password} label="password" name="password" id="password" onChange={handleChange} onKeyPress={handleKeyPress} />
						<div className={classes.error_log}>{tryLogin && error["password"] && error["password"].length > 0 && error.password}</div>
						<FormControlLabel
							className={classes.rememberMe}
							control={
								<Checkbox
									checked={checkStatus}
									onChange={handleRememberMe}
								/>
							}
							label="Zapami??taj mnie"
						/>
						<div className={classes.buttonContainer}>
							<Button variant="outlined" className={clsx(classes.btnLogin, global_classes.outline_button)} onClick={handleSignIn}>
								Zaloguj si??
							</Button>
							<Link to={ PATHS.ForgotPassword } component={RouterLink} className={classes.btnForgot}>Odzyskaj has??o</Link>
							<Link to={ PATHS.Registration } component={RouterLink} className={classes.btnRegister}>Zarejestruj si?? <ArrowRightAltIcon className={classes.arrow}/></Link>
						</div>
					</div>
				</div>
			</div>
			<ProgressBar progressStatus={progressStatus}/>
		</>
	);
};

SignIn.propTypes = {
	history: PropTypes.object
};

export default withRouter(SignIn);
