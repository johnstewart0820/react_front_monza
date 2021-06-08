import React from 'react';
import "./table-filters.scss";

const TableFilters = props => {
	
	const { fields, onChange } = props;

	return (
		<div className="table-filters">
			{ fields && !!fields.length &&
				fields.map(( field, i ) => {

					const FieldComponent = field?.component;
					const name = field?.props?.name;

					return (
						<div 
							key={ name || i } 
							className={`table__td column-${ i + 1 }`}
						>
							{ FieldComponent && 
								<FieldComponent  
									{...field.props }
									onChange={ e => console.log( name, e.target.value )}
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