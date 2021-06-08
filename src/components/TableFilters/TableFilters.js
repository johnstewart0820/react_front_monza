import React from 'react';
import "./table-filters.scss";

const TableFilters = props => {
	
	const { fields, onChange } = props;

	return (
		<div className="table-filters">
			{ fields && !!fields.length &&
				fields.map(( field, i ) => {

					const FieldComponent = field?.component;

					return (
						<div className={`table__td column-${ i + 1 }`}>
							{ FieldComponent && 
								<FieldComponent 
									key={ field.name } 
									{...field.props }
									onChange={ e => console.log( field.name, e.target.value )}
								/> 
							}
						</div> 
					)
				})
			}
		</div>
	)
}


export default TableFilters;