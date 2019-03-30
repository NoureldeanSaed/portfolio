import React from 'react';

import { Game, Hireme } from '..';

import './index.less';

const Home = () => {
	return (
		<div className='home'>
			<Game width={600} height={900} className={'game'} />
		</div>
	);
};

export default Home;
