// Inspired by https://codepen.io/ZORLAX/pen/yQmMbo?editors=0010
import uuidv4 from 'uuid/v4';

import { randomBetween, transitionToColor, $20, $30 } from '../../../helpers';
import drawFactory from './drawFactory.js';

const massTypes = Object.freeze({ CLOUD: 0, LAND: 1 });
const massProps = Object.freeze({
	MAX_LENGTH: 80,
	MIN_LENGTH: 15,
	MAX_WIDTH: 30,
	MIN_WIDTH: 15,
	MAX_DX: 1.2,
	MIN_DX: 0.5,
	FIXED_DX: 0.7
});

let earthHealth = 1;
let earthPopulation = 100000;
const rabbitingRatio = 1.01;
let pollution = 0.5;	// Between 0 and 1 // Less than .5 is healing // More than .5 is killing
let noFactories = 0;
let planetState = 'infected';

export const getPollution = () => pollution;
export const getPlanetState = () => planetState;
export const getEarthHealth = () => earthHealth;

export default (WIDTH, HEIGHT, vars) => (ctx) => {
	const { getMouseMoveEvent, factoryActions, ...globals } = vars;
	const Factory = drawFactory(ctx, globals);
	const { EARTH_X, EARTH_Y } = globals;
	const EARTH_R = 120;
	const randomAroundCenter = (axisPoint, controlPoint = 0) =>
		randomBetween(axisPoint + EARTH_R, axisPoint - EARTH_R - controlPoint);
	const circle = (cx, cy, r, bg) => {
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2, 0);
		ctx.fillStyle = transitionToColor(bg, '#58554D', -earthHealth + 1);
		ctx.fill();
	};
	const shadow = (cx, cy, r, bg) => {
		ctx.beginPath();
		ctx.arc(cx, cy, r, Math.PI * 1.5, 1.5, false);
		ctx.fillStyle = bg;
		ctx.fill();
	};
	class Mass {
		constructor (x, y, dx, width, length, type) {
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.width = width;
			this.length = length;
			this.type = type;
			if (type === massTypes.LAND) this.id = uuidv4();
		}

		draw = () => {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineCap = 'round';
			ctx.lineWidth = this.width;
			ctx.lineTo(this.x + this.length, this.y);
			ctx.strokeStyle = this.type === massTypes.CLOUD
				? transitionToColor('#FFFFFF', '#1C1D1F', - earthHealth + 1)
				: transitionToColor('#85CC66', '#C58C45', - earthHealth + 1);
			ctx.setLineDash([]);
			ctx.stroke();
		}

		update = () => {
			if (this.x < (EARTH_X - 240)) this.x = EARTH_X + 240;
			this.x -= this.dx;
			this.draw();
		}

		// Remove the 0.3 and 0.2 from the scale factor and just replace the numbers in drawFactory.js
		pushFactory = () => {
			if ((this.width / massProps.MAX_WIDTH) - 0.2 >= 0.4 && !this.factory) {
				this.factory = new Factory(
					this.id,
					(this.width / massProps.MAX_WIDTH) - 0.2,
					{ getMouseMoveEvent, factoryActions }
				);
				noFactories++;
			}
		};

		destroyFactory = () => {this.factory = null; noFactories--;};
	}

	const clouds = $20.map(() => new Mass(
		randomAroundCenter(EARTH_X, massProps.MAX_LENGTH),
		randomAroundCenter(EARTH_Y),
		randomBetween(massProps.MIN_DX, massProps.MAX_DX),
		randomBetween(massProps.MIN_WIDTH, massProps.MAX_WIDTH),
		randomBetween(massProps.MIN_LENGTH, massProps.MAX_LENGTH),
		massTypes.CLOUD
	));
	const lands = $30.map(() => new Mass(
		randomAroundCenter(EARTH_X, massProps.MAX_LENGTH),
		randomAroundCenter(EARTH_Y),
		massProps.FIXED_DX,
		randomBetween(massProps.MIN_WIDTH, massProps.MAX_WIDTH),
		randomBetween(massProps.MIN_LENGTH, massProps.MAX_LENGTH),
		massTypes.LAND
	));

	const createFactory = () => {
		lands[~~randomBetween(0, lands.length)].pushFactory();
	};

	const destroyFactory = (factoryId) => lands
		.forEach((land) => factoryId === land.id ? land.destroyFactory() : null);

	const damageEarth = () => {
		if (earthHealth > 0)
			earthHealth -= 0.02;
		if (earthHealth <= 0) earthHealth = 0;
		if (earthPopulation > 0)
			earthPopulation -= ~~(earthPopulation * 0.01);
	};

	const animations = () => {
		if (planetState === 'infected') {
			if (noFactories > 1 && pollution <= 1) pollution += noFactories * 0.001;
			else if (pollution >= 0) pollution -= 0.01;
			earthPopulation += ~~(earthPopulation * rabbitingRatio * earthHealth);
			if (earthHealth === 0) {
				earthPopulation = 0;
				planetState = 'healing';
			}
		} else if (planetState === 'healing') {
			earthHealth += 0.001;
			lands.forEach((land) => land.destroyFactory());
			if (earthHealth > 1) earthHealth = 1;
		}
		circle(EARTH_X, EARTH_Y, 125, '#0C1438');
		circle(EARTH_X, EARTH_Y, 120, '#1976B5');
		ctx.save();
		ctx.beginPath();
		ctx.arc(EARTH_X, EARTH_Y, 120, 0, Math.PI * 2, false);
		ctx.clip();
		lands.forEach((land) => land.update());
		lands.forEach((land) => {
			if (land.factory) {
				const factoryProps = { x: land.x, y: land.y, width: land.width, length: land.length };
				const scaleFactor = (land.width / massProps.MAX_WIDTH * 0.3) - 0.2;
				land.factory.update(factoryProps, scaleFactor, { getMouseMoveEvent, factoryActions });
			}
		});
		clouds.forEach((cloud) => cloud.update());
		shadow(EARTH_X, EARTH_Y, 120, 'rgba(0,0,0,.2)');
		ctx.fillStyle = 'rgba(0,0,0,0)';
		ctx.fill();
		ctx.restore();

	};

	return [animations, { damageEarth, createFactory, destroyFactory }];
};
