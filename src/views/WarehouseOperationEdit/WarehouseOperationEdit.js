import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import warehouse_operation from 'apis/warehouse_operation';
import { useToasts } from 'react-toast-notifications';
import main from 'utils/main';
import PATHS from 'routes/paths';

const WarehouseOperationEdit = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const id = props.match.params.id;
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Operacje magazynowe', 'Dodaj nowy/Edytuj'];
	const [data, setData] = useState({ date: null });
	const [listInfo, setListInfo] = useState({ assortment: [], warehouse: [], logistic_unit: [], measure_unit: []});

	useEffect(() => {
		warehouse_operation
			.getInfo()
			.then(response => {
				if (response.code === 200) {
					setListInfo(response.data);
				}
			})
	}, []);

	useEffect(() => {
		warehouse_operation.get(id)
			.then(response => {
				if (response.code !== 401) {
					setData(response.data);
				}
			})
	}, [listInfo.assortment]);

	useEffect(() => {
		let purchase_price = main.getAttrFromArray(listInfo.assortment, data.assortment, 'purchase_price', '');
		let sale_price = main.getAttrFromArray(listInfo.assortment, data.assortment, 'sale_price', '');
		let calculated_received_value = main.round(main.convertStrToNum(purchase_price) * main.convertStrToNum(data.received), 2);
		let calculated_releases_value = main.round(main.convertStrToNum(sale_price) * main.convertStrToNum(data.release), 2);
		let stock_value = main.round(main.convertStrToNum(purchase_price) * main.convertStrToNum(data.stock), 2);
		let order_value = main.round(main.convertStrToNum(sale_price) * main.convertStrToNum(data.order), 2);
		setData({
			...data,
			'purchase_price': purchase_price, 
			'sale_price': sale_price,
			'received_value': main.convertNumToStr(calculated_received_value),
			'release_value': main.convertNumToStr(calculated_releases_value),
			'stock_pln': main.convertNumToStr(stock_value),
			'order_pln': main.convertNumToStr(order_value)
		})
	}, [data.assortment, data.received, data.release, data.received_number, data.release_number, data.stock, data.order])

	const handleSave = () => {
		warehouse_operation
			.update(data, id)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push( PATHS.WarehouseOperation )}, 1000);
					} else {
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				}
			})
	}

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}

	const handleDelete = () => {
		warehouse_operation
			.delete(id)
			.then(response => {
				if (response.code === 200) {
					addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
					setTimeout(function () { history.push( PATHS.WarehouseOperation )}, 1000);
				}
			})
	}

	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_operation" />
			<SingleDetail title="Dane dotyczące operacje" type="edit" handleSave={handleSave} handleDelete={handleDelete}>
			<React.Fragment>
					<FormInput title="Asortyment" name="assortment" type="single" value={data.assortment} list={listInfo.assortment} handleChange={handleChange} />
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Cena zakupu" name="purchase_price" type="input" value={data.purchase_price} handleChange={handleChange} disabled={true}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Cena sprzedaży" name="sale_price" type="input" value={data.sale_price} handleChange={handleChange} disabled={true}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Data" name="date" type="date" value={data.date} handleChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Magazyn" name="warehouse" type="single" value={data.warehouse} list={listInfo.warehouse} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Jednostka miary" name="measure_unit" type="single" value={data.measure_unit} list={listInfo.measure_unit} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Jednostka logistyczna" name="logistic_unit" type="single" value={data.logistic_unit} list={listInfo.logistic_unit} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Wielkość przyjęć [jedn. m.] [jedn. log.]" name="received" type="number" value={data.received} handleChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wielkość wydań [jedn. m.] [jedn. log.]" name="release" type="number" value={data.release} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Liczba przyjęć [-]" name="received_number" type="number" value={data.received_number} handleChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Liczba wydań [-]" name="release_number" type="number" value={data.release_number} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Wartość przyjęć [PLN]" name="received_value" type="input" value={data.received_value} handleChange={handleChange} disabled={true}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wartość wydań [PLN]" name="release_value" type="input" value={data.release_value} handleChange={handleChange} disabled={true}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Koszt obslugi i dostawy" name="handling_delivery_cost" type="number" value={data.handling_delivery_cost} handleChange={handleChange}/>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Zapas [jedn. m.] [jedn. log.]" name="stock" type="number" value={data.stock} handleChange={handleChange} />
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wielkość zamówienia [jedn. m.] [jedn. log.]" name="order" type="number" value={data.order} handleChange={handleChange} />
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<FormInput title="Wartość zapasu [PLN]" name="stock_pln" type="input" value={data.stock_pln} handleChange={handleChange} disabled={true}/>
						</Grid>
						<Grid item xs={6}>
							<FormInput title="Wartość zamówienia [PLN] " name="order_pln" type="input" value={data.order_pln} handleChange={handleChange} disabled={true}/>
						</Grid>
					</Grid>
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default WarehouseOperationEdit;
