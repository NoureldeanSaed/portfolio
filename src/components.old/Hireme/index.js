import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { RevealGrid, ImgLink } from '..';
import { CONTACT_ME_GRID, MY_LINKEDIN, MY_GITHUB } from '../../constants';

import './index.less';

const Hireme = (props) => {
	const [revealGridStage, setRevealGridStage] = useState(0);
	const [hasMouseEnter, setMouseEnter] = useState(false);
	useEffect(() => {
		if (revealGridStage === 2) return;
		if (hasMouseEnter && revealGridStage === 0) setRevealGridStage(1);
		else if (!hasMouseEnter && revealGridStage === 1) setRevealGridStage(0);
	});
	const disabled = revealGridStage === 2 ? {} : { style: { pointerEvents: 'none' } };
	return (
		<div
			className={classNames('hireme-wrapper', revealGridStage > 0 && 'active')}
			onClick={() => setRevealGridStage(revealGridStage === 2 ? 1 : 2)}
		>
			<div
				className='hireme-text'
				onMouseEnter={() => setMouseEnter(true)}
				onMouseLeave={() => setMouseEnter(false)}
			>Contact me</div>
			<ImgLink
				href={MY_LINKEDIN}
				className='linkedin-img'
				{...disabled}
				src='./dist/public/in-tile.svg'
			/>
			<ImgLink
				href={MY_GITHUB}
				className='github-img'
				{...disabled}
				src='./dist/public/github.svg'
			/>
			<img className='upwork-img' src='./dist/public/upwork-tile.svg' {...disabled} />
			<RevealGrid
				gridWidth={8}
				gridHeight={11}
				className='hireme-grid'
				levels={CONTACT_ME_GRID}
				cell={{
					height: 15,
					width: 35,
					className: 'cell'
				}}
				status={revealGridStage}
				timeout={0.1}
			/>
		</div>
	);
};
// <div className='hireme-folding'>
// 	<span /><span /><span /><span /><span /><span className='empty'/>
// 	<span /><span /><span /><span /><span className='empty'/><span className='empty'/>
// 	<span /><span /><span /><span /><span /><span className='empty'/>
// 	<span /><span /><span /><span /><span /><span />
// </div>

export default Hireme;
