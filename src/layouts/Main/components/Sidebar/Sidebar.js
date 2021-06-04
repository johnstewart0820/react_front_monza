import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';

import PATHS from "routes/paths";
import { SidebarNav } from './components';
import useStyles from './style';

const Sidebar = props => {
	const { open, variant, history, onClose, className, staticContext, ...rest } = props;
	const classes = useStyles();
	const items = [
		{
			label: 'MONITOROWANIE POZIOMU I STANU ZAPASÓW'
		},
		{
			title: 'Asortyment',
			href: PATHS.Assortment,
		},
		{
			title: 'Grupy asortymentowe',
			href: PATHS.AssortmentGroup,
		},
		{
			title: 'Magazyny',
			href: PATHS.Warehouse,
		},
		{
			title: 'Grupy magazynów',
			href: PATHS.WarehouseGroup,
		},
		{
			title: 'Kontrahenci',
			href: PATHS.Contractor,
		},
		{
			title: 'Jednostki miary',
			href: PATHS.MeasureUnit,
		},
		{
			title: 'Operacje magazynowe',
			href: PATHS.WarehouseOperation,
		},
		{
			label: 'ANALIZA DOT. KLASYFIKACJI ASORTYMENTU'
		},
		{
			title: 'Analiza ABC i XYZ',
			href: PATHS.AnalyzeXyz,
		},
		{
			label: 'ANALIZA WSKAŹNIKÓW ZAPASÓW'
		},
		// {
		// 	title: 'Analiza wskaźników zapasów',
		// 	href: '/analyze_indicator',
		// },
		{
			label: 'ANALIZA KOSZTÓW ZAPASÓW'
		},
		// {
		// 	title: 'Koszt uzupełnienia zapasu średniego',
		// 	href: '/average_stock_cost',
		// },
		// {
		// 	title: 'Koszt uzupełnienia zapasu',
		// 	href: '/stock_cost',
		// },
		// {
		// 	title: 'Całkowity koszt gromadzenia i truzymania zapasów',
		// 	href: '/total_stock_cost',
		// },
		{
			label: 'PROFIL'
		},
		{
			title: 'Edytuj',
			href: PATHS.Profile,
		},
	];

	return (
		<Drawer
			anchor="left"
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div
				{...rest}
				className={clsx(classes.root, className)}
			>
				<div className={classes.logoBlock}>
					<img src="/images/black_logo.png" className={classes.main_logo} aria-hidden="true" alt="Logo Państwowy Fundusz Rehabilitacji Osób Niepełnosprawnych"/>
				</div>
				<SidebarNav
					className={classes.nav}
					pages={items}
					history={history}
				/>
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
};

export default withRouter(Sidebar);
