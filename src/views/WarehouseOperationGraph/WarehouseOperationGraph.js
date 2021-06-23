import React, { useState, useEffect } from 'react';
import { BreadcrumbBack, ColorBox, FormInput, FullDetail, MultiDetail, OutlineButton, SwatchPicker } from 'components';
import useStyles from './style';
import { Grid, Typography } from '@material-ui/core';
import warehouse_operation from 'apis/warehouse_operation';
import { useToasts } from 'react-toast-notifications';
import PATHS from 'routes/paths';
import moment from 'utils/moment';
import {
	ComposedChart,
	Line,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const WarehouseOperationGraph = props => {
	const { children, history } = props;
	const classes = useStyles();
	const { addToast } = useToasts()
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Operacje magazynowe', 'Generuj wykres', 'Wygenerowany wykres'];
	const [data, setData] = useState({ date_from: null, date_to: null, assortment: [], duration: '', value_quantity: '', });
	const [chart_filter, setChartFilter] = useState({ supply_color: '#00ff00', received_color: '#000000', releases_color: '#00ffff', order_color: '#ff0000', chart_type: 'mixed'  });
	const [listInfo, setListInfo] = useState({ assortment: [], warehouse: [], unit: [], measure_unit: [], contractor: [] });

	const [table_data, setTableData] = useState([
	]);
	const value_quantity_list = [
		{ label: 'Wartościowo', value: 'value' },
		{ label: 'Ilościowo', value: 'quantity' }
	];
	const duration_list = [
		{ label: 'Dziennie', value: 'daily' },
		{ label: 'Tygodniowo', value: 'weekly' },
		{ label: 'Miesięcznie', value: 'monthly' }
	];

	const chart_type_list = [
		{ label: 'Wszystkie słupkowe', value: 'bar' },
		{ label: 'Wszystkie liniowe', value: 'line' },
		{ label: 'Mieszane', value: 'mixed' }
	];

	const chart_show_type_list = [
		{ id: 1, name: 'liniowy' },
		{ id: 2, name: 'słupkowy' },
	];

	const continuous_type_list = [
		{ id: 1, name: 'ciągła' },
		{ id: 2, name: 'dashed' }
	];

	const filling_type_list = [
		{ id: 1, name: 'TAK' },
		{ id: 2, name: 'NIE' }
	];

	const handleChange = (name, value) => {
		setData({ ...data, [name]: value });
	}

	const handleChangeFilter = (name, value) => {
		if (name === 'chart_type') {
			if (value === 'bar') {
				setChartFilter({ ...chart_filter, supply_show_chart_type: '2', releases_show_chart_type: '2', received_show_chart_type: '2', order_show_chart_type: '2', chart_type: 'bar' });
			} else if (value === 'line') {
				setChartFilter({ ...chart_filter, supply_show_chart_type: '1', releases_show_chart_type: '1', received_show_chart_type: '1', order_show_chart_type: '1', chart_type: 'line' });
			} else {
				setChartFilter({ ...chart_filter, chart_type: 'mixed' });
			}
		} else {
			setChartFilter({ ...chart_filter, [name]: value });
		}
	}

	const handleBack = () => {
		history.push(PATHS.WarehouseOperationGenerate);
	}

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
		let _temp = {};

		_temp.value_quantity = localStorage.getItem('value_quantity', 'value');
		_temp.duration = localStorage.getItem('duration', 'monthly');
		_temp.assortment = JSON.parse(localStorage.getItem('assortment'));
		_temp.warehouse = localStorage.getItem('warehouse');
		_temp.date_from = localStorage.getItem('date_from', null);
		_temp.date_to = localStorage.getItem('date_to', null);
		setData(_temp);
	}, [listInfo.assortment]);

	useEffect(() => {
		warehouse_operation
			.getChartData(data.assortment, data.warehouse, moment.getStringFromDateFormat(data.date_from), moment.getStringFromDateFormat(data.date_to), data.value_quantity, data.duration)
			.then(response => {
				if (response.code === 200) {
					setTableData(response.data.chart_data);
				}
			})
	}, [data]);

	const getAssortmentName = () => {
		let arr = [];
		listInfo.assortment.length > 0 && data.assortment.map((item, index) => {
			arr.push(listInfo.assortment[item - 1].name);
		});
		return arr.join(', ');
	}
	return (
		<>
			<BreadcrumbBack list={breadcrumb} back_url="/warehouse_operation" />
			<MultiDetail button_name="Generuj nowy wykres" handleButton={handleBack}>
				<React.Fragment>
					<Grid container spacing={3}>
						<Grid item xs={3}>
							<Typography variant="h2" className={classes.title}>
								Generuj wykres
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<FormInput title="Asortyment" name="assortment" type="several_single" value={data.assortment} handleChange={handleChange} list={listInfo.assortment} button_title="Dodaj asortyment do porównania" disabled={true} />
							<FormInput title="Magazyn" name="warehouse" type="single" value={data.warehouse} handleChange={handleChange} list={listInfo.warehouse} disabled={true} />
							<Grid container spacing={2}>
								<Grid item xs={5}>
									<FormInput title="Data od" name="date_from" type="date" value={data.date_from} handleChange={handleChange} disabled={true} />
								</Grid>
								<Grid item xs={5}>
									<FormInput title="Data do" name="date_to" type="date" value={data.date_to} handleChange={handleChange} disabled={true} />
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<FormInput title="Wartościowo/Ilościowo" name="value_quantity" type="radio" value={data.value_quantity} handleChange={handleChange} list={value_quantity_list} disabled={true} />
								</Grid>
								<Grid item xs={12}>
									<FormInput title="Częstotliwość" name="duration" type="radio" value={data.duration} handleChange={handleChange} list={duration_list} disabled={true} />
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h2" className={classes.title}>
								Wygenerowany wykres:
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h6" className={classes.title_6}>
								{data.value_quantity === 'value' ? 'Wartościowy wykres operacji magazynowych ' : 'Wielkościowy wykres opracji magazynowych '}
								{data.duration === 'daily' ? 'w ujęciu dziennym ' : 
									data.duration === 'weekly' ? 'w ujęciu tygodniowym ' : 'w ujęciu miesiecznym '
								}
									w okresie od {moment.getStringFromDateFormat(data.date_from)} do {moment.getStringFromDateFormat(data.date_to)} {'dla asortymentów: '}
								{
									getAssortmentName()
								}
							</Typography>
						</Grid>
						<Grid item xs={12} className={classes.container}>
							<ResponsiveContainer width="100%" height="100%">
								<ComposedChart
									width={500}
									height={400}
									data={table_data}
									margin={{
										top: 20,
										right: 80,
										bottom: 20,
										left: 20,
									}}
								>
									<CartesianGrid stroke="#f5f5f5" />
									<XAxis dataKey="name" scale="band" />
									<YAxis label={{ value: 'Wielkość [J.H]', angle: -90, position: 'insideLeft' }} />
									<Tooltip />
									<Legend />
									{
										chart_filter.supply && (
											Number(chart_filter.supply_show_chart_type) !== 2 ?
												Number(chart_filter.supply_filling_type) !== 2 ?
													Number(chart_filter.supply_continuous_type) !== 2 ?
														<Area type="monotone" dataKey="Zapas" fill={chart_filter.supply_color} stroke={chart_filter.supply_color}/>
														:
														<Area type="monotone" dataKey="Zapas" fill={chart_filter.supply_color} stroke={chart_filter.supply_color} strokeDasharray="5 5"/>
													:
													Number(chart_filter.supply_continuous_type) !== 2 ?
														<Line type="monotone" dataKey="Zapas" stroke={chart_filter.supply_color} />
														:
														<Line type="monotone" dataKey="Zapas" stroke={chart_filter.supply_color} strokeDasharray="5 5"/>
												:
												<Bar dataKey="Zapas" barSize={20} fill={chart_filter.supply_color} />
										)
									}
									{
										chart_filter.received && (
											Number(chart_filter.received_show_chart_type) !== 2 ?
												Number(chart_filter.received_filling_type) !== 2 ?
													Number(chart_filter.received_continuous_type) !== 2 ?
														<Area type="monotone" dataKey="Przyjęcia" fill={chart_filter.received_color} stroke={chart_filter.received_color}/>
														:
														<Area type="monotone" dataKey="Przyjęcia" fill={chart_filter.received_color} stroke={chart_filter.received_color} strokeDasharray="5 5"/>
													:
													Number(chart_filter.received_continuous_type) !== 2 ?
														<Line type="monotone" dataKey="Przyjęcia" stroke={chart_filter.received_color} />
														:
														<Line type="monotone" dataKey="Przyjęcia" stroke={chart_filter.received_color} strokeDasharray="5 5" />
												:
												<Bar dataKey="Przyjęcia" barSize={20} fill={chart_filter.received_color} />
										)
									}
									{
										chart_filter.releases && (
											Number(chart_filter.releases_show_chart_type) !== 2 ?
												Number(chart_filter.releases_filling_type) !== 2 ?
													Number(chart_filter.releases_continuous_type) !== 2 ?
														<Area type="monotone" dataKey="Wydania" fill={chart_filter.releases_color} stroke={chart_filter.releases_color}/>
														:
														<Area type="monotone" dataKey="Wydania" fill={chart_filter.releases_color} stroke={chart_filter.releases_color} strokeDasharray="5 5"/>
													:
													Number(chart_filter.releases_continuous_type) !== 2 ?
														<Line type="monotone" dataKey="Wydania" stroke={chart_filter.releases_color} />
														:
														<Line type="monotone" dataKey="Wydania" stroke={chart_filter.releases_color} strokeDasharray="5 5" />
												:
												<Bar dataKey="Wydania" barSize={20} fill={chart_filter.releases_color} />
										)
									}
									{
										chart_filter.order && (
											Number(chart_filter.order_show_chart_type) !== 2 ?
												Number(chart_filter.order_filling_type) !== 2 ?
													Number(chart_filter.order_continuous_type) !== 2 ?
														<Area type="monotone" dataKey="Zamówienia" fill={chart_filter.order_color} stroke={chart_filter.order_color}/>
														:
														<Area type="monotone" dataKey="Zamówienia"  stroke={chart_filter.order_color} fill={chart_filter.order_color} strokeDasharray="5 5"/>
													:
													Number(chart_filter.order_continuous_type) !== 2 ?
														<Line type="monotone" dataKey="Zamówienia" stroke={chart_filter.order_color} />
														:
														<Line type="monotone" dataKey="Zamówienia" stroke={chart_filter.order_color} strokeDasharray="5 5" />
												:
												<Bar dataKey="Zamówienia" barSize={20} fill={chart_filter.order_color} />
										)
									}

								</ComposedChart>
							</ResponsiveContainer>
						</Grid>
						<Grid item xs={3}>

						</Grid>
						<Grid item xs={9}>
							<FormInput title="Wykresy" name="chart_type" type="radio" value={chart_filter.chart_type} handleChange={handleChangeFilter} list={chart_type_list} />
							<Grid container spacing={2}>
								<Grid item xs={2}>
									<Typography variant="h6" className={classes.title_6}>
										Dane na wykresach
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="h6" className={classes.title_6}>
										Typ wykresu
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="h6" className={classes.title_6}>
										Rodzaj linii
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="h6" className={classes.title_6}>
										Wypełnienie
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography variant="h6" className={classes.title_6}>
										Kolor
									</Typography>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={2}>
									<FormInput title="Zapas" name="supply" type="check_box" value={chart_filter.supply} handleChange={handleChangeFilter} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="supply_show_chart_type" type="single_without_empty" value={chart_filter.supply_show_chart_type} handleChange={handleChangeFilter} list={chart_show_type_list} disabled={!chart_filter.supply || chart_filter.chart_type !== 'mixed'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="supply_continuous_type" type="single_without_empty" value={chart_filter.supply_continuous_type} handleChange={handleChangeFilter} list={continuous_type_list} disabled={!chart_filter.supply || chart_filter.supply_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="supply_filling_type" type="single_without_empty" value={chart_filter.supply_filling_type} handleChange={handleChangeFilter} list={filling_type_list} disabled={!chart_filter.supply || chart_filter.supply_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<ColorBox name="supply_color" value={chart_filter.supply_color} handleChange={handleChangeFilter}/>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={2}>
									<FormInput title="Przyjęcia" name="received" type="check_box" value={chart_filter.received} handleChange={handleChangeFilter} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="received_show_chart_type" type="single_without_empty" value={chart_filter.received_show_chart_type} handleChange={handleChangeFilter} list={chart_show_type_list} disabled={!chart_filter.received || chart_filter.chart_type !== 'mixed'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="received_continuous_type" type="single_without_empty" value={chart_filter.received_continuous_type} handleChange={handleChangeFilter} list={continuous_type_list} disabled={!chart_filter.received || chart_filter.received_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="received_filling_type" type="single_without_empty" value={chart_filter.received_filling_type} handleChange={handleChangeFilter} list={filling_type_list} disabled={!chart_filter.received || chart_filter.received_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<ColorBox name="received_color" value={chart_filter.received_color} handleChange={handleChangeFilter}/>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={2}>
									<FormInput title="Wydania" name="releases" type="check_box" value={chart_filter.releases} handleChange={handleChangeFilter} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="releases_show_chart_type" type="single_without_empty" value={chart_filter.releases_show_chart_type} handleChange={handleChangeFilter} list={chart_show_type_list} disabled={!chart_filter.releases || chart_filter.chart_type !== 'mixed'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="releases_continuous_type" type="single_without_empty" value={chart_filter.releases_continuous_type} handleChange={handleChangeFilter} list={continuous_type_list} disabled={!chart_filter.releases || chart_filter.releases_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="releases_filling_type" type="single_without_empty" value={chart_filter.releases_filling_type} handleChange={handleChangeFilter} list={filling_type_list} disabled={!chart_filter.releases || chart_filter.releases_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<ColorBox name="releases_color" value={chart_filter.releases_color} handleChange={handleChangeFilter}/>
								</Grid>
							</Grid>
							<Grid container spacing={2}>
								<Grid item xs={2}>
									<FormInput title="Zamówienia" name="order" type="check_box" value={chart_filter.order} handleChange={handleChangeFilter} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="order_show_chart_type" type="single_without_empty" value={chart_filter.order_show_chart_type} handleChange={handleChangeFilter} list={chart_show_type_list} disabled={!chart_filter.order || chart_filter.chart_type !== 'mixed'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="order_continuous_type" type="single_without_empty" value={chart_filter.order_continuous_type} handleChange={handleChangeFilter} list={continuous_type_list} disabled={!chart_filter.order || chart_filter.order_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<FormInput name="order_filling_type" type="single_without_empty" value={chart_filter.order_filling_type} handleChange={handleChangeFilter} list={filling_type_list} disabled={!chart_filter.order || chart_filter.order_show_chart_type === '2'} />
								</Grid>
								<Grid item xs={2}>
									<ColorBox name="order_color" value={chart_filter.order_color} handleChange={handleChangeFilter}/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</React.Fragment>
			</MultiDetail>
		</>
	);
};

export default WarehouseOperationGraph;
