import React from 'react';
import { Tracker, Portal, Nightskies } from '..';

import './index.less';

const Home = (props) => (
	<div className='home'>
		<Tracker />
		<Portal />
		<Nightskies />
		<div>Hello whomever</div>
		<div>Thanks for cloning :)</div>
	</div>
);

export default Home;
