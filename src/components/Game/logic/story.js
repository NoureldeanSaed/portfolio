let prevTimeStamp;
let timeCounter = 0;

export default () => {
	const currTimeStamp = Date.now();
	const timeDifference = prevTimeStamp ? (currTimeStamp - prevTimeStamp) / 1000 : 1;
	timeCounter += timeDifference;
	const time = timeCounter;
	const bossMood = Object.freeze({ COOL: 0, MAD: 1, PISSED: 2 });
	const actions = { bossMood: bossMood.COOL };
	// EVERY 60 seconds rageFire
	if (time / 15 % 4 >= 0 && time / 15 % 4 < 0.01) actions.rageFire = true;
	// Every 45 seconds go PISSED
	if (time / 15 > 1 && time / 15 % 3 < 1) actions.bossMood = bossMood.PISSED;
	// Every 30 seconds go MAD
	else if (time / 15 > 1 && time / 15 % 2 < 1) actions.bossMood = bossMood.MAD;
	// Every 15 seconds go COOL
	else if (time / 15 % 1 < 1) actions.bossMood = bossMood.COOL;

	prevTimeStamp = currTimeStamp;
	return actions;
};
