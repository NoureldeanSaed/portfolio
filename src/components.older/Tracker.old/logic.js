import React from 'react';

export const SPAN_HEIGHT = 15;
const LETTER_WIDTH = 9.61;
const LETTER_ARRAY = [160, ...[34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
	64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
	97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124].sort(() => 0.5 - Math.random())];
const PEAK_ANIMATION_WEIGHT = LETTER_ARRAY.length - 1;

const stringify = (charCode) => String.fromCharCode(charCode);

const genCharCode = () => Math.floor(Math.random() * PEAK_ANIMATION_WEIGHT);

export const spanifyHeight = () => {
	const maxHeight = window.innerHeight;
	const maxWidth = window.innerWidth;

	const expectedRows = parseInt(maxHeight / SPAN_HEIGHT);
	const expectedCols = parseInt(maxWidth / LETTER_WIDTH);
	const spansArray = Array.apply(null, new Array(expectedRows)).map((x, i) => i);
	return { array: spansArray, rows: expectedRows, cols: expectedCols };
};

export const createStringArray = (width) => Array
	.apply(null, new Array(parseInt(width / LETTER_WIDTH)))
	.map(() => ({ letter: stringify(LETTER_ARRAY[0]), code: 0, animationWeight: 0 }));

export const trackLine = (xCoord, stringArray, weight, delta) => {
	const characterLeftMargin = parseInt(xCoord / LETTER_WIDTH);
	const charCode = genCharCode();
	stringArray[characterLeftMargin] = {
		letter: stringify(LETTER_ARRAY[charCode]),
		code: charCode,
		animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight)
	};
	if (Math.abs(delta.x) > 5) {
		if (stringArray[characterLeftMargin + 1]) {
			stringArray[characterLeftMargin + 1] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.5)
			};
		}
		if (stringArray[characterLeftMargin - 1]) {
			stringArray[characterLeftMargin - 1] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.5)
			};
		}
	}
	if (Math.abs(delta.x) > 10) {
		if (stringArray[characterLeftMargin + 2]) {
			stringArray[characterLeftMargin + 2] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.3)
			};
		}
		if (stringArray[characterLeftMargin - 2]) {
			stringArray[characterLeftMargin - 2] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.3)
			};
		}
	}
	if (Math.abs(delta.x) > 15) {
		if (stringArray[characterLeftMargin + 3]) {
			stringArray[characterLeftMargin + 3] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.2)
			};
		}
		if (stringArray[characterLeftMargin - 3]) {
			stringArray[characterLeftMargin - 3] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.2)
			};
		}
	}
	if (Math.abs(delta.x) > 20) {
		if (stringArray[characterLeftMargin + 4]) {
			stringArray[characterLeftMargin + 4] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.1)
			};
		}
		if (stringArray[characterLeftMargin - 4]) {
			stringArray[characterLeftMargin - 4] = {
				letter: stringify(LETTER_ARRAY[charCode]),
				code: charCode,
				animationWeight: parseInt(PEAK_ANIMATION_WEIGHT * weight * 0.1)
			};
		}
	}
	return stringArray;
};

export const animateLine = (stringArray) => stringArray.reduce((accum, curr, index) => {
	if (curr.animationWeight === 0) {
		accum.stringArray.push({ letter: stringify(LETTER_ARRAY[0]), code: 0, animationWeight: 0 });
	} else {
		const charCode = genCharCode();
		accum.stringArray.push({
			letter: stringify(charCode),
			code: charCode,
			animationWeight: curr.animationWeight - 1
		});
		accum.changed = true;
	}
	return accum;
}, { stringArray: [], changed: false });


export const getFillString = (rows, cols) => Array
	.apply(null, new Array(rows)).map(() => Array
		.apply(null, new Array(cols)).map(() => ({ valueIndex: 0 })));

export const trackerMousemove = (moveEv, stringArray) => {
	const { clientX, clientY } = moveEv;
	const hoveredRow = parseInt(clientY / SPAN_HEIGHT);
	const hoveredCol = parseInt(clientX / LETTER_WIDTH);
	const set = (marginLeft, marginTop, value) => {
		if (stringArray[hoveredRow + marginLeft]
			&& stringArray[hoveredRow + marginLeft][hoveredCol + marginTop]) {
			stringArray[hoveredRow + marginLeft][hoveredCol + marginTop]
				.valueIndex = PEAK_ANIMATION_WEIGHT * value;
		}
	};

	/*
	 *							.7     .75     .7
	 *								.85  .9  .85
	 *								 .9   1  .9
	 *								.85  .9  .85
	 *							.7     .75     .7
	 */

	set(0, 0, 1);

	set(1, 0, 0.9);
	set(-1, 0, 0.9);
	set(0, 1, 0.9);
	set(0, -1, 0.9);

	set(1, 1, 0.85);
	set(1, -1, 0.85);
	set(-1, 1, 0.85);
	set(-1, -1, 0.85);

	set(2, 0, 0.75);
	set(-2, 0, 0.75);
	set(0, 2, 0.75);
	set(0, -2, 0.75);

	set(2, 2, 0.7);
	set(-2, 2, 0.7);
	set(2, -2, 0.7);
	set(-2, -2, 0.7);

	return stringArray;
};

export const repaintSpanArray = (stringArray) => stringArray
	.map((row, i) => <span key={i}>{row.map((key) => String.fromCharCode(key)).join('')}</span>);

export const animate = (stringArray) => stringArray
	.map((row) => row.map((col) => col.valueIndex === 0 ? col : { valueIndex: col.valueIndex - 1 }));
