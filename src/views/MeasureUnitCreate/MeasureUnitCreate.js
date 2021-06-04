import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import measurement_unit from 'apis/measurement_unit';
import { useToasts } from 'react-toast-notifications';
import PATHS from 'routes/paths';

const MeasureUnitCreate = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Jednostki miary', 'Dodaj nowy/Edytuj'];
	const [data, setData] = useState({});
	const [listInfo, setListInfo] = useState({ typeList: [] })

	useEffect(() => {
		measurement_unit
			.getInfo()
			.then(response => {
				if (response.code === 200) {
					setListInfo(response.data);
				}
			})
	}, []);

	const handleSave = () => {
		measurement_unit
			.create(data)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true });
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push( PATHS.MeasureUnit )}, 1000);
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
			<BreadcrumbBack list={breadcrumb} back_url="/measure_unit" />
			<SingleDetail title="Dane dotyczące jednostki" handleSave={handleSave}>
				<React.Fragment>
					<FormInput title="Jednostka" name="type" type="single" value={data.type} list={listInfo.typeList} handleChange={handleChange} />
					<FormInput title="Nazwa jednostki" name="name" type="input" value={data.name} handleChange={handleChange} />
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default MeasureUnitCreate;
