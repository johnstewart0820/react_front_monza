import React from 'react';
import "./breadcrumbs.scss";

const Breadcrumb = props => {

	const { list, extra_classes } = props;
	const title = "Po zmianie opcji wyszukiwania formularz przeładuje się automatycznie";
  
	return (
		<div className={`breadcrumbs ${ extra_classes || ""}`}>
			{ list && list.map(( item, index ) => (
				<span key={ index }  title={title}> { item } </span>
			)) }
		</div>
	)
};

export default Breadcrumb;
