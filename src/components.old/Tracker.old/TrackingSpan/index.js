import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { createStringArray, trackLine, animateLine, SPAN_HEIGHT } from '../logic';

import './index.less';

const TrackingSpan = ({ width, mousePosition, index, delta }) => {
	const [innerText, setText] = useState(createStringArray(width));
	const [animating, animate] = useState(false);

	useEffect(() => {
		if (parseInt(mousePosition.y / SPAN_HEIGHT) === index) {
			if (!animating) animate(true);
			trackLine(mousePosition.x, innerText, 1, delta);
		}
		if (delta.y > 10 && (parseInt(mousePosition.y / SPAN_HEIGHT) === index + 1
			|| parseInt(mousePosition.y / SPAN_HEIGHT) === index - 1)) {
			if (!animating) animate(true);
			trackLine(mousePosition.x, innerText, 0.85, delta);
		}
		if (animating) {
			const { stringArray: newStringArray, changed } = animateLine(innerText);
			setText(newStringArray);
			if (!changed) animate(false);
		}

	});
	return (
		<span className='tracking-span'>
			{innerText.map((el) => el.letter).join('')}
		</span>
	);
};

TrackingSpan.propTypes = { width: PropTypes.number.isRequired };

export default TrackingSpan;
