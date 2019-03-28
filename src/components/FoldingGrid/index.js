import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuidv4 from 'uuid/v4';

import logic from './logic';

import { deepEqual, seekEqual, getRowAndCol, getTransformOrigin } from '../../helpers';

import './index.less';

class RevealGrid extends Component {
	state = { id: `canv-${uuidv4()}` }

	componentDidMount = () => {
		this.draw();
	}

	draw = () => {
		const { id } = this.state;
		const { cell, levels, timeout, status } = this.props;
		const gridProps = { cell, levels, timeout, getStatus: () => status };
		const canvas = document.getElementById(id);
		const ctx = canvas.getContext('2d');
		const { drawGrid, animates } = logic(ctx);
		const [gridAnimations] = drawGrid(gridProps);
		const cancelAnimationFrame = animates(gridAnimations);

		// this.setState((state) => ({ ...state, cancelAnimationFrame }));
	}

	render = () => {
		const { width, height, cell, status, levels, timeout, ...rest } = this.props;
		const { id } = this.state;

		return (
			<canvas
				{...rest}
				id={id}
				width={width * cell.width}
				height={height * cell.height}
				className={classNames('reveal-grid', rest.className)}
			/>
		);
	}
}

RevealGrid.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	cell: PropTypes.shape({
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired
	}).isRequired,
	status: PropTypes.number.isRequired,
	levels: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))).isRequired,
	timeout: PropTypes.number.isRequired
};

export default RevealGrid;
