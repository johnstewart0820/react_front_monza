import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, FormInput, SingleDetail } from 'components';
import useStyles from './style';
import { Grid } from '@material-ui/core';
import assortment_group from 'apis/assortment_group';
import { useToasts } from 'react-toast-notifications';
import PATHS from 'routes/paths';

const AssortmentGroupCreate = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Grupy asortymentowe', 'Dodaj nową/Edytuj'];
	const [data, setData] = useState({});
	const [listInfo, setListInfo] = useState({ groupList: [] })

	useEffect(() => {
		assortment_group
			.getInfo()
			.then(response => {
				if (response.code === 200) {
					setListInfo(response.data);
				}
			})
	}, []);
	const handleSave = () => {
		assortment_group
			.create(data)
			.then(response => {
				if (response.code === 401) {
					addToast(response.message, { appearance: 'error', autoDismissTimeout: 3000, autoDismiss: true })
				} else {
					if (response.code === 200) {
						addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						setTimeout(function () { history.push( PATHS.AssortmentGroup ) }, 1000);
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
			<BreadcrumbBack list={breadcrumb} back_url="/group_assortment" />
			<SingleDetail title="Dane dotyczące grupy asortymentowej" handleSave={handleSave}>
				<React.Fragment>
					<FormInput title="Nazwa grupy" name="name" type="input" value={data.name} handleChange={handleChange} />
					<FormInput title="Grupa główna" name="is_main_group" type="check_box" value={data.is_main_group} handleChange={handleChange} />
					<Grid container spacing={2}>
						{data.is_main_group !== true && data.is_main_group !== 1
							&&
							< Grid item xs={6}>
								<FormInput title="Grupa główna" name="main_group" type="single" value={data.main_group} list={listInfo.groupList} handleChange={handleChange} />
							</Grid>
						}
						<Grid item xs={6}>
							<FormInput title="Kod" name="code" type="input" value={data.code} handleChange={handleChange} />
						</Grid>
					</Grid>
					<FormInput title="Opis" name="description" type="area" value={data.description} handleChange={handleChange} />
				</React.Fragment>
			</SingleDetail>
		</>
	);
};

export default AssortmentGroupCreate;
