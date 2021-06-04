import React  from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/styles';
import useStyles from './style';
import { Grid } from '@material-ui/core';

import { ReactComponent as LogoSvg } from "assets/svg/logo.svg";  

const Minimal = props => {
  	const { children } = props;
	const theme = useTheme();
	const classes = useStyles( theme );

  return (
		<div className={ classes.root }>
			<Grid container spacing={3} justify="center">
				
				<LogoSvg/>

				<main className={ classes.content }>
					{ children }
				</main>
			</Grid>
		</div>
	)
};

Minimal.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default Minimal;
