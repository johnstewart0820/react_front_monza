import React from 'react';

import { Table, Breadcrumb } from "components";

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


const mock_rows = [
	[ 12, "01/05/2021", "Odbiorca3", "12.04.2021", "ul. Główna 1", 555562, "14 dni", "XXXXXXXXXX", "787 77 77", ""],  // { component: <div></div> , props: {} }],
	[ 13, "01/05/2021", "Odbiorca3", "12.04.2021", "ul. Główna 1", 555562, "14 dni", "XXXXXXXXXX", "787 77 77", ""], // { component: <div></div> , props: {} }],
	[ 14, "01/05/2021", "Odbiorca3", "12.04.2021", "ul. Główna 1", 555562, "14 dni", "XXXXXXXXXX", "787 77 77", ""], // { component: <div></div> , props: {} }],

]

const Orders = props => {

	return (
		<>
			<Breadcrumb list={ breadcrumbs } />

			<Table
				extra_classes="orders-table"
				head={ table_head }
				rows={ mock_rows }
			/>
		</>
	)
}


export default Orders;