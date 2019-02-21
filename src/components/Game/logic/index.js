import drawBoss from './drawBoss';
import drawEarth from './drawEarth';
import drawAtmosphere from './drawAtmosphere';
import drawMissiles from './drawMissiles';
import drawExplosions from './drawExplosions';
import drawBgStars from './drawBgStars';
import animates from './animates';
import playStory from './story';

export default (WIDTH, HEIGHT, getMouseMoveEvent) => {
	const globals = {
		BOSS_X: 400 - 45,
		BOSS_Y: HEIGHT * 0.1,
		EARTH_X: 400,
		EARTH_Y: 600
	};
	return {
		drawBoss: drawBoss(WIDTH, HEIGHT, globals),
		drawEarth: drawEarth(WIDTH, HEIGHT, globals),
		drawAtmosphere: drawAtmosphere(WIDTH, HEIGHT, globals),
		drawMissiles: drawMissiles(WIDTH, HEIGHT, { getMouseMoveEvent, ...globals }),
		drawExplosions: drawExplosions(WIDTH, HEIGHT),
		drawBgStars: drawBgStars(WIDTH, HEIGHT),
		animates: animates(WIDTH, HEIGHT),
		playStory
	};
};
