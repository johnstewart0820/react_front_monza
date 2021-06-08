import React from 'react';
import "./form-input.scss";

const FormInput = props => {

	const { extra_classes, name, label, ...rest_props } = props;
	const id = props.id || name;
	const type = props.type || "text";

	return (
		<div className={`form-input ${ extra_classes || ""}`}>
			{ label && 
				<label htmlFor={ id }> 
					{ label } 
				</label> 
			}

			<input
				name={ name }
				type={ type }
				{...rest_props }
			/>

		</div>
	)
}


export default FormInput;