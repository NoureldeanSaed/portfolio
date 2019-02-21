// Inspired by https://codepen.io/ZORLAX/pen/yQmMbo?editors=0010
import { randomBetween, transitionToColor, getRadian, $20 } from '../../../helpers';
import drawFactory from './drawFactory';

const massTypes = Object.freeze({ CLOUD: 0, LAND: 1 });
const massProps = Object.freeze({
	MAX_LENGTH: 70,
	MIN_LENGTH: 5,
	MAX_WIDTH: 10,
	MIN_WIDTH: 30,
	MAX_DX: 1.2,
	MIN_DX: 0.5,
	FIXED_DX: 0.7
});

let earthHealth = 1;

export default (WIDTH, HEIGHT, globals) => (ctx) => {
	const Factory = drawFactory(ctx);
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
			if (type === massTypes.LAND) this.factory = new Factory();
		}

		draw = () => {
			ctx.save();
			ctx.beginPath();
			ctx.arc(EARTH_X, EARTH_Y, 120, 0, Math.PI * 2, false);
			ctx.clip();
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
			ctx.restore();
			// if (this.factory) {
			// 	const factoryProps = { x: this.x, y: this.y, width: this.width, length: this.length };
			// 	this.factory.update(factoryProps, this.width / massProps.MAX_WIDTH * 0.3);
			// }
		}

		update = () => {
			if (this.x < (EARTH_X - 240)) this.x = EARTH_X + 240;
			this.x -= this.dx;
			this.draw();
			// this.factories.forEach((factory) => factory.update(this.x, this.y));
		}
	}

	const clouds = $20.map(() => new Mass(
		randomAroundCenter(EARTH_X, massProps.MAX_LENGTH),
		randomAroundCenter(EARTH_Y),
		randomBetween(massProps.MIN_DX, massProps.MAX_DX),
		randomBetween(massProps.MIN_WIDTH, massProps.MAX_WIDTH),
		randomBetween(massProps.MIN_LENGTH, massProps.MAX_LENGTH),
		massTypes.CLOUD
	));
	const lands = $20.map(() => new Mass(
		randomAroundCenter(EARTH_X, massProps.MAX_LENGTH),
		randomAroundCenter(EARTH_Y),
		massProps.FIXED_DX,
		randomBetween(massProps.MIN_WIDTH, massProps.MAX_WIDTH),
		randomBetween(massProps.MIN_LENGTH, massProps.MAX_LENGTH),
		massTypes.LAND
	));

	const damageEarth = () => {
		if (earthHealth > 0)
			earthHealth -= 0.01;
	};

	const animations = () => {
		circle(EARTH_X, EARTH_Y, 125, '#0C1438');
		circle(EARTH_X, EARTH_Y, 120, '#1976B5');
		lands.forEach((land) => land.update());
		clouds.forEach((cloud) => cloud.update());
		shadow(EARTH_X, EARTH_Y, 120, 'rgba(0,0,0,.2)');
		ctx.fillStyle = 'rgba(0,0,0,0)';
		ctx.fill();
	};

	return [animations, damageEarth];
};
