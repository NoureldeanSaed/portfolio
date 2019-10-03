import React, { useState, useEffect } from 'react';

import { spanifyHeight } from './logic';
import TrackingSpan from './TrackingSpan';

import './index.less';

const Tracker = (props) => {
	const [windowWidth, setWidth] = useState(window.innerWidth);
	const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
	const [delta, setDelta] = useState({ dx: 0, dy: 0 });

	const spansArray = spanifyHeight();
	const funimations = {
		onMouseMove: (moveEv) => {
			const { clientX: x, clientY: y } = moveEv;
			setMousePosition({ x, y });
			setDelta({ x: x - mousePosition.x, y: y - mousePosition.y });
		}
	};
	window.addEventListener('resize', () => {
		setWidth(window.innerWidth);
	});
	return (
		<div className='tracker' {...funimations}>
			{
				spansArray.array.map((i, x) => {
					return (
						<TrackingSpan
							key={x}
							index={x}
							delta={delta}
							width={windowWidth}
							mousePosition={mousePosition}
						/>
					);
				})
			}
		</div>
	);
};

export default Tracker;
