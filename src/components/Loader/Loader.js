import React from 'react';
import PropTypes from 'prop-types';

import './loader.scss';

const Loader = ({ style }) => (
	<div className="loader" style={ style }>
		<div className="cssload-whirlpool"/>
	</div>
)

Loader.propTypes = {
	style: PropTypes.object
}

export default Loader;
