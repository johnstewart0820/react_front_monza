import React from 'react';

import "./sort-table.scss";

const SortTable = props => {

	const { head, rows, extra_classes } = props;


	return (
		<>
			<div className={`table ${ extra_classes || "" }`}>
				
				<div className="table__head flex">
					{ head && !!head.length && 
						head.map(({ label, sort }, i ) => (
							<div 
								key={ i } 
								className="table__th df-centered"
								style={{ cursor: sort ? "pointer" : null }}
								// onClick={ () => onSortClick( i )}
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
												: item.label
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
		</>
	)
}


export default SortTable;