import React, { useState, useMemo, useEffect } from 'react';

import { Table, Breadcrumb, FormInputC, FormSelect } from "components";

const breadcrumbs = [ 'Monitorowanie poziomu zapasów', 'Zamówienia' ];

const table_head = [
	{ label: "ID", sort: true },
	{ label: "Numer zamówienia", sort: true },
	{ label: "Zamawiający", sort: true },
	{ label: "Dokument z dnia", sort: true },
	{ label: "Adres wysyłkowy", sort: true },
	{ label: "REGON", sort: true },
	{ label: "Warunki płatności", sort: true },
	{ label: "Konto bankowe", sort: true },
	{ label: "NIP", sort: true },
	{ label: "Akcje" }
];


const filter_fields = [
	{ 
		component: FormInputC,
		props: {
			name: "id",
			placeholder: "Wpisz ID"
		} 
	},
	{ 
		component: FormInputC,
		props: {
			name: "number",
			placeholder: "Wpisz numer"
		} 
	},
	{
		component: FormSelect,
		props: {
			name: "purchaser",
		}
	},
	{
		component: FormSelect,
		props: {
			name: "doc_dated",
		}
	},
	{
		component: FormInputC,
		props: {
			name: "address",
			placeholder: "Wpisz"
		}
	},
	{
		component: FormInputC,
		props: {
			name: "regon",
			placeholder: "Wpisz"
		}
	},
	{
		component: FormInputC,
		props: {
			name: "payment",
			placeholder: "Wpisz"
		}
	},
	{
		component: FormInputC,
		props: {
			name: "bank_acc",
			placeholder: "Wpisz"
		}
	},
	{
		component: FormInputC,
		props: {
			name: "nip",
			placeholder: "Wpisz NIP"
		}
	},
	null
]

const Orders = props => {

	const [ sort_option, setSortOption ] = useState({ sortBy: 0, sortOrder: "asc" });
	const [ filters_data, setFiltersData ] = useState({ name: '', index: '', gtin: '', unit: 0, measure_unit: 0, active: 0, to_order: 0 });
	const [ page, setPage ] = useState(1);
	const [ data, setData ] = useState([]);

	const rows = useMemo(() => [], [ data ]);


	return (
		<>
			<Breadcrumb list={ breadcrumbs } />

			<Table
				extra_classes="orders-table"
				head={ table_head }
				rows={ rows }
				filter_fields={ filter_fields }
				order={ sort_option.sortOrder }
				sort_by={ sort_option.sortBy }
			/>
		</>
	)
}


export default Orders;
