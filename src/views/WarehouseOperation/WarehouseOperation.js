import React, { useState, useEffect } from 'react';
import useStyles from './style';
import useGlobalStyles from 'assets/style/styles';
import { useToasts } from 'react-toast-notifications';
import { SortTable } from './components';
import { Breadcrumb, ListViewController, PaginationController } from 'components';
import warehouse_operation from 'apis/warehouse_operation';
import { warehouse_operation_header } from 'utils/xlsx_headers';
import { ProgressBar } from 'components';
import main from 'utils/main';
import moment from 'utils/moment';
import PATHS from 'routes/paths';

const WarehouseOperation = props => {
	const { children, history } = props;
	const classes = useStyles();
	const global_classes = useGlobalStyles();
	const breadcrumb = ['Monitorowanie poziomu zapasów', 'Operacje magazynowe'];
	const { addToast } = useToasts()

	const [sortOption, setSortOption] = useState({ sortBy: 0, sortOrder: "asc" });
	const [searchOption, setSearchOption] = useState({ start_date: moment.getStringFromDateFormat(new Date()), end_date: moment.getStringFromDateFormat(new Date()), assortment: 0, assortment_group: 0, measure_unit: 0, logistic_unit: 0,  warehouse: 0, received: '', release: '', order: '', handling_delivery_cost: '' });
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [data, setData] = useState([]);
	const [listInfo, setListInfo] = useState({
		assortment: [],
		assortment_group: [],
		logistic_unit: [],
		measure_unit: [],
		warehouse: [],
	})
	const [progressStatus, setProgressStatus] = useState(false);

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
		handleSearch();
	}, [sortOption, page]);

	useEffect(() => {
		handleSearch();
		setPage(1);
	}, [searchOption]);

	

	const handleCreate = () => {
		history.push( PATHS.WarehouseOperationCreate );
	}

	const handleImport = (rows) => {
		setProgressStatus(true);
		warehouse_operation
		.create_list(rows)
		.then(response => {
			if (response.code === 200) {
				addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
				handleSearch();
			}
			setProgressStatus(false);
		})

	}

	const handleExport = () => {
		setProgressStatus(true);
		warehouse_operation
			.export()
			.then(response => {
				if (response.code === 200) {
					main.export(warehouse_operation_header, response.data);
				}
				setProgressStatus(false);
			})
	}

	const handleGenerate = () => {
		history.push( PATHS.WarehouseOperationGenerate );
	}

	const requestSort = (pSortBy) => {
		let sortOrder = "asc";
		if (pSortBy === sortOption.sortBy) {
			sortOrder = (sortOption.sortOrder === "asc" ? "desc" : "asc");
		}
		setSortOption({ sortBy: pSortBy, sortOrder: sortOrder })
	}

	const handleDelete = (index) => {
		warehouse_operation
			.delete(index)
			.then(response => {
				if (response.code === 200) {
					addToast(response.message, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
				}
				handleSearch();
				setPage(1);
			})
	}

	const handleSearch = () => {
		warehouse_operation
			.getListByOption(sortOption, 25, page, searchOption)
			.then(response => {
				if (response.code === 200) {
					setData(response.data.list);
					setTotal(response.data.count);
				}
			})
	}

	return (
		<>
			<ListViewController
				CreateTitle="Dodaj nową operację"
				ImportTitle="Dodaj dane z pliku XLS"
				ExportTitle="Eksportuj listę do XLS"
				AddTitle="Generuj wykres"
				handleCreate={handleCreate}
				handleImport={handleImport}
				handleExport={handleExport}
				handleGenerate={handleGenerate}
				header_list={warehouse_operation_header}
			/>
			<Breadcrumb list={breadcrumb} parent_class={global_classes.breadcrumb_class} />
			<SortTable
				rows={data}
				requestSort={requestSort}
				sortOption={sortOption}
				searchOption={searchOption}
				setSearchOption={setSearchOption}
				handleDelete={handleDelete}
				handleChange={setData}
				listInfo={listInfo}
			/>
			{
				total !== 0 &&
				<PaginationController total={total} page={page} setPage={setPage} />
			}
			<ProgressBar progressStatus={progressStatus} />
		</>
	);
};

export default WarehouseOperation;
