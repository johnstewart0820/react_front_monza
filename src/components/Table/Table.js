import React from 'react';

import "./table.scss";

const Table = props => {

	const { head, rows, extra_classes, onSortClick } = props;


	return (
		<div className={`table ${ extra_classes || "" }`}>
				
			<div className="table__head flex">
				{ head && !!head.length && 
					head.map(({ label, sort }, i ) => (
						<div 
							key={ i } 
							className="table__th"
							style={{ cursor: sort ? "pointer" : null }}
							onClick={ () => sort && onSortClick( i )}
						>
							{ label }

							{/* { sort && 
								<div className="sort-by df-column">
									{ i !== sort_by && 
										<>
											<RectangleUpIcon/>
											<RectangleDownIcon/>
										</>
									}	

									{ i === sort_by && 
										<>
											{ order === "asc" 
												? <RectangleDownIcon/>
												: <RectangleUpIcon/>
											}		
										</>
									}
								</div>
							} */}
						</div>
					))
				}
			</div>

			<div className="table__body">
				{ rows && !!rows?.length && 
					rows.map(( row, i ) => (
						<div key={ i } className="table__tr flex">
							{ row && !!row.length &&
								row.map(( item, j ) => (
									<div key={ j } className="table__td">
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