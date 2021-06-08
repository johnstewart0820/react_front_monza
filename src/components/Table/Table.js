import React from 'react';
import { TableFilters }  from 'components';
import { AngleUpSvg, AngleBottomSvg } from "svg/icons";

import "./table.scss";

const Table = props => {

	const { head, rows, sort_by, order, filter_fields, extra_classes, onSortClick, onFilterChange } = props;

	return (
		<div className={`table ${ extra_classes || "" }`}>
				
			<div className="table__head flex">
				{ head && !!head.length && 
					head.map(({ label, sort }, i ) => (
						<div 
							key={ i } 
							className={`table__th df-ac column-${ i + 1 }`}
							style={{ cursor: sort ? "pointer" : null }}
							onClick={ () => sort && onSortClick && onSortClick( i )}
						>
							{ label }

							{ sort && 
								<div className="sort-by df-column">
									{ i !== sort_by && 
										<>
											<AngleUpSvg/>
											<AngleBottomSvg/>
										</>
									}	

									{ i === sort_by && 
										<>
											{ order === "asc" 
												? <AngleBottomSvg/>
												: <AngleUpSvg/>
											}		
										</>
									}
								</div>
							}
						</div>
					))
				}
			</div>

			{ filter_fields && 
				<TableFilters
					fields={ filter_fields }
					onChange={ onFilterChange }
				/>
			}

			<div className="table__body">
				{ rows && !!rows?.length && 
					rows.map(( row, i ) => (
						<div key={ i } className="table__tr flex">
							{ row && !!row.length &&
								row.map(( item, j ) => (
									<div key={ j } className={`table__td column-${ j + 1 }`}>
										{ item.component 
											? <item.component {...item.props }/>
											: item
										}
									</div>
								))
							}
						</div>
					))
				}

				{( !rows || !rows.length ) && 
					<div className="table__empty"> 
						Nie znaleziono alertów dla wybranych kryteriów wyszukiwania. 
					</div> 
				}
			</div>
		</div>
	)
}


export default Table;