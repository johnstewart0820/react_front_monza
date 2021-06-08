import React from 'react';
import "./form-select.scss";

const FormSelect = props => {

	const { name, label, options, error_message, ...rest_props } = props;
	const id = props.id || name;

	return (
		<div className="form-select">
			{ label && 
				<label htmlFor={ id }> 
					{ label } 
				</label> 
			}

			<select 
				id={ id }
				name={ name }
				{...rest_props }
			> 
				{ options && !!options.length && 
					options.map(({ value, label }) => (
						<option key={ value } value={ value }> 
							{ label } 
						</option>
					))
				}
			</select>
		</div>
	)
}


export default FormSelect;