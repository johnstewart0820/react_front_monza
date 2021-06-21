import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, FullDetail, OutlineButton } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import warehouse_operation from 'apis/warehouse_operation';
import { useToasts } from 'react-toast-notifications';
import main from 'utils/main';
import PATHS from 'routes/paths';
import constants from 'utils/constants';

const WarehouseOperationGenerateGraph = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Operacje magazynowe', 'Generuj wykres'];
	const [data, setData] = useState({ date_from: null, date_to: null, assortment: [] });
	const [listInfo, setListInfo] = useState({ assortment: [], warehouse: [], unit: [], measure_unit: [], contractor: [] });
	const value_quantity_list = [
		{ label: 'Wartościowo', value: 'value' },
		{ label: 'Ilościowo', value: 'quantity' }
	];
	const duration_list = [
		{ label: 'Dziennie', value: 'daily' },
		{ label: 'Tygodniowo', value: 'weekly' },
		{ label: 'Miesięcznie', value: 'monthly' }
	];
	useEffect(() => {
		warehouse_operation
			.getInfo()
			.then(response => {
				if (response.code === 200) {
					setListInfo(response.data);
				}
			})
	}, []);

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}

	const handleGenerate = () => {
		console.log(data.value_quantity);
		if (!data.value_quantity || !data.duration || data.assortment.length === 0 || data.warehouse === 0 || data.warehouse === null || data.date_from === null || data.date_to === null)
			addToast(constants.WRONG_DATA, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
		else {
			localStorage.setItem('value_quantity', data.value_quantity);
			localStorage.setItem('duration', data.duration);
			localStorage.setItem('assortment', JSON.stringify(data.assortment));
			localStorage.setItem('warehouse', data.warehouse);
			localStorage.setItem('date_from', data.date_from);
			localStorage.setItem('date_to', data.date_to);
			history.push(PATHS.WarehouseOperationGraph);
		}
	}

	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_operation" />
			<FullDetail title="Generuj wykres">
				<React.Fragment>
					<FormInput title="Asortyment" name="assortment" type="several_single" value={data.assortment} handleChange={handleChange} list={listInfo.assortment} button_title="Dodaj asortyment do porównania" />
					<FormInput title="Magazyn" name="warehouse" type="single" value={data.warehouse} handleChange={handleChange} list={listInfo.warehouse} />
					<Grid container spacing={2}>
						<Grid item xs={5}>
							<FormInput title="Data od" name="date_from" type="date" value={data.date_from} handleChange={handleChange} />
						</Grid>
						<Grid item xs={5}>
							<FormInput title="Data do" name="date_to" type="date" value={data.date_to} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormInput title="Wartościowo/Ilościowo" name="value_quantity" type="radio" value={data.value_quantity} handleChange={handleChange} list={value_quantity_list} />
						</Grid>
						<Grid item xs={12}>
							<FormInput title="Częstotliwość" name="duration" type="radio" value={data.duration} handleChange={handleChange} list={duration_list} />
						</Grid>
					</Grid>
					<Grid container spacing={2} justify="flex-end">
						<Grid item xs={4}>
							<OutlineButton title="Generuj wykres" onClick={handleGenerate} parent_class={classes.button} />
						</Grid>
					</Grid>
				</React.Fragment>
			</FullDetail>
		</>
	);
};

export default WarehouseOperationGenerateGraph;
