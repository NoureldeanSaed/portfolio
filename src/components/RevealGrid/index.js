import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { deepEqual, seekEqual, getRowAndCol, getTransformOrigin } from '../../helpers';

import './index.less';

const RevealGrid = (props) => {
	const { gridWidth, gridHeight, cell, status, levels, timeout, ...rest } = props;
	const [currentGroup, updateGroup] = useState(levels[status]);
	const spanArray = [];
	useEffect(() => {
		if (!deepEqual(currentGroup, levels[status]))
			setTimeout(() => updateGroup(seekEqual(currentGroup, levels[status])), timeout * 1000);
	});
	const rootIndex = getRowAndCol(currentGroup, currentGroup.findIndex((el) => el === 0));
	for (let index = 0; index < gridWidth * gridHeight; index++) {
		const { row, col } = getRowAndCol(levels[0], index);
		const className = classNames(
			cell.className,
			currentGroup[row][col] === 1 ? 'hidden' : 'visible',
			getTransformOrigin(rootIndex)(currentGroup, row, col).replace(' ', '-'),
		);
		spanArray.push(<span {...cell} className={className}/>);
	}

	return (
		<div
			{...rest}
			className={classNames('reveal-grid', rest.className)}
			style={{
				gridTemplateRows: `repeat(${gridHeight}, ${cell.height}px)`,
				gridTemplateColumns: `repeat(${gridWidth}, ${cell.width}px)`
			}}
		>
			{spanArray}
		</div>
	);
};

RevealGrid.propTypes = {
	gridWidth: PropTypes.number.isRequired,
	gridHeight: PropTypes.number.isRequired,
	cell: PropTypes.shape({
		className: PropTypes.string,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired
	}).isRequired,
	status: PropTypes.number.isRequired,
	levels: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	timeout: PropTypes.number.isRequired
};

export default RevealGrid;
