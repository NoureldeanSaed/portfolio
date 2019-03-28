let prevTimeStamp;
let timeCounter = 0;

import { getPlanetState, getEarthHealth } from './drawEarth';
import { bossMood } from './drawBoss';

export default (storyFunctions) => {
	const { rageFire, population, createFactory } = storyFunctions;
	// const bossMood = Object.freeze({ COOL: 0, MAD: 1, PISSED: 2, HAPPY: 3 });

	const currTimeStamp = Date.now();
	const timeDifference = prevTimeStamp ? (currTimeStamp - prevTimeStamp) / 1000 : 1;
	timeCounter += timeDifference;
	const time = timeCounter;

	const actions = { bossMood: bossMood.COOL };
	const noHumans = getPlanetState() === 'healing';

	// EVERY 60 seconds rageFire
	if (time / 15 % 4 >= 0 && time / 15 % 4 < 0.01 && !noHumans) rageFire();
	// Every 45 seconds go PISSED
	if (time / 15 > 1 && time / 15 % 3 < 1) actions.bossMood = bossMood.PISSED;
	// Every 30 seconds go MAD
	else if (time / 15 > 1 && time / 15 % 2 < 1) actions.bossMood = bossMood.MAD;
	// Every 15 seconds go COOL
	else if (time / 15 % 1 < 1) actions.bossMood = bossMood.COOL;

	if (time % 4 >= 0 && time % 4 <= 0.02 && !noHumans) createFactory();
	if (noHumans) actions.bossMood = bossMood.HAPPY;
	prevTimeStamp = currTimeStamp;
	return actions;
};
