import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import { useToasts } from 'react-toast-notifications';
import warehousegroup from 'apis/warehousegroup';
import PATHS from 'routes/paths';

const WarehouseGroupCreate = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Grupy magazynów', 'Dodaj nowy/Edytuj'];
	const [data, setData] = useState({ warehouses: [] });
	const [listInfo, setListInfo] = useState({ warehouse_list: [] })

	useEffect(() => {
		warehousegroup
			.getInfo()
			.then(response => {
				if (response.code === 200) {
					setListInfo(response.data);
				}
			})
	}, []);

	const handleSave = () => {
		warehousegroup
			.create(data)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push( PATHS.WarehouseGroup ) }, 1000);
					} else {
						addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
					}
				}
			})
	}

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}
	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_group" />
			<SingleDetail title="Dane dotyczące grupy magazynów" handleSave={handleSave}>
				<React.Fragment>
					<FormInput title="Nazwa grupy" name="name" type="input" value={data.name} handleChange={handleChange} />
					<FormInput title="Przynależne magazyny" name="warehouses" type="several_single" value={data.warehouses} handleChange={handleChange} list={listInfo.warehouse_list} button_title="Dodaj kolejny magazyn"/>
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
					<FormInput title="Aktywny" name="active" type="check_box" value={data.active} handleChange={handleChange} />
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default WarehouseGroupCreate;
