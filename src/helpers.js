export const randomBetween = (min, max) => Math.random() * (max - min) + min;

export const $4 = [];
export const $10 = [];
export const $20 = [];
export const $30 = [];
export const $50 = [];
export const $200 = [];

for (let i = 0; i < 400; i++) {
	if (i < 4) $4.push(i);
	if (i < 10) $10.push(i);
	if (i < 20) $20.push(i);
	if (i < 30) $30.push(i);
	if (i < 50) $50.push(i);
	if (i < 200) $200.push(i);
}

const b = (t, p0, p1, p2, p3) => (
	((1 - t) ** 3 * p0) + (3 * (1 - t) ** 2 * t * p1) + (3 * (1 - t) * t ** 2 * p2) + (t ** 3 * p3)
);

const getHex = (dec) => dec.toString(16);

export const bezierCubicCurve = (startPoint, cp1, cp2, endPoint) => (t) => ({
	x: b(t, startPoint.x, cp1.x, cp2.x, endPoint.x),
	y: b(t, startPoint.y, cp1.y, cp2.y, endPoint.y)
});

export const getRadian = (degree) => degree * Math.PI / 180;

export const getDegrees = (radian) => radian / Math.PI * 180;

export const roundDegrees = (degrees) => {
	const cycles = 360 * (degrees > 0 ? Math.floor(degrees / 360) : Math.ceil(-degrees / 360));
	if (degrees < 0) return degrees + cycles;
	if (cycles > 0) return degrees - cycles;
	return degrees;
};

export const getSlope = (p1, p2 = { x: 0, y: 0 }) => (p2.y - p1.y) / (p2.x - p1.x);

export const getSlopeAngle = (slope) => Math.atan(slope);

export const recallEvery = (callback, timeFunction) => {
	const time = timeFunction();
	if (isFinite(time)) {
		const timeout = setTimeout(() => {
			callback();
			recallEvery(callback, timeFunction);
		}, time);
		return timeout;
	}
};

export const persistEvent = (ev) => ({
	clientX: ev.clientX,
	clientY: ev.clientY
});

/*
 *	@params {String} start a hexadecimal string representation e.g. "#FAC01200"
 *	@params {String} end a hexadecimal string representation e.g. "#FAC01200"
 *	@params {Number} control a control number between 0 and 1 that repreesents how far the
 *										transition went
 *	@returns {String} a hex that is between start and end and as far from the start as control
 */
export const transitionToColor = (start, end, control) => {
	const startRed = parseInt(`0x${start.substring(1, 3)}`);
	const startGreen = parseInt(`0x${start.substring(3, 5)}`);
	const startBlue = parseInt(`0x${start.substring(5, 7)}`);
	const startAlpha = start.substring(7, 9) ? parseInt(`0x${start.substring(7, 9)}`) : 0xFF;
	const endRed = parseInt(`0x${end.substring(1, 3)}`);
	const endBlue = parseInt(`0x${end.substring(3, 5)}`);
	const endGreen = parseInt(`0x${end.substring(5, 7)}`);
	const endAlpha = end.substring(7, 9) ? parseInt(`0x${end.substring(7, 9)}`) : 0xFF;

	const red = startRed < endRed
		? startRed + Math.floor((endRed - startRed) * control)
		: startRed - Math.floor((startRed - endRed) * control);
	const green = startGreen < endGreen
		? startGreen + Math.floor((endGreen - startGreen) * control)
		: startGreen - Math.floor((startGreen - endGreen) * control);
	const blue = startBlue < endBlue
		? startBlue + Math.floor((endBlue - startBlue) * control)
		: startBlue - Math.floor((startBlue - endBlue) * control);
	const alpha = startAlpha < endAlpha
		? startAlpha + Math.floor((endAlpha - startAlpha) * control)
		: startAlpha - Math.floor((startAlpha - endAlpha) * control);

	const hex = `#${getHex(red)}${getHex(green)}${getHex(blue)}${getHex(alpha)}`;
	return hex;
};

export const getNeighbors = (grid, rowIndex, colIndex) => [
	grid[rowIndex - 1] && grid[rowIndex - 1][colIndex],
	grid[rowIndex + 1] && grid[rowIndex + 1][colIndex],
	grid[rowIndex][colIndex + 1],
	grid[rowIndex][colIndex - 1]
];

export const deepEqual = (a, b) => a
	.every((row, rowIndex) => row.every((col, colIndex) => col === b[rowIndex][colIndex]));

export const seekEqual = (a, b) => a.map((row, rowIndex) => row.map((col, colIndex) => {
	if (col === b[rowIndex][colIndex] || Math.random() < 0.2) return col;
	const neighbors = getNeighbors(a, rowIndex, colIndex);
	if (col === 0 && neighbors.includes(1)) return 1;
	if (col === 1 && neighbors.includes(0)) return 0;
	return col;
}));

export const getRowAndCol = (grid, cellIndex) => ({
	row: Math.floor(cellIndex / grid[0].length),
	col: cellIndex % grid[0].length
});

export const getTransformOrigin = ({ row: rootRow, col: rootCol }) =>
	(grid, rowIndex, colIndex) => {
		const neighbors = getNeighbors(grid, rowIndex, colIndex).filter(($) => $);
		const preferredDirectionsToGo = {
			row: rowIndex === 0 || (rowIndex - rootRow < 0 && neighbors[0] === 1) ? 'top'
				: neighbors[1] === undefined || (rowIndex - rootRow > 0 && neighbors[1] === 1) ? 'bottom'
					: rowIndex % 5 === 0 ? 'top' : 'bottom',
			col: colIndex === 0 || (colIndex - rootCol < 0 && neighbors[2] === 1) ? 'right'
				: neighbors[3] === undefined || (colIndex - rootCol > 0 && neighbors[3] === 1) ? 'left'
					: colIndex % 5 === 0 ? 'right' : 'left'
		};
		preferredDirectionsToGo.row = colIndex % 2 === 0 ? preferredDirectionsToGo.row : 'center';
		preferredDirectionsToGo.col = colIndex % 2 === 0 ? 'center' : preferredDirectionsToGo.col;
		return `${preferredDirectionsToGo.row} ${preferredDirectionsToGo.col}`;
	};
