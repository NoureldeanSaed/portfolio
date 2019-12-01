import uuidv4 from 'uuid/v4';

import { bossMood } from './drawBoss';
import { getPlanetState } from './drawEarth';
import {
	$20,
	randomBetween,
	bezierCubicCurve,
	getSlope,
	getSlopeAngle,
	recallEvery,
	getDegrees, roundDegrees, getRadian
} from '../../../helpers';

// Number of seconds before new missile
const missileFrequency = Object.freeze({
	[bossMood.HAPPY]: Infinity,
	[bossMood.COOL]: 5,
	[bossMood.MAD]: 2,
	[bossMood.PISSED]: 0.5
});

export default (WIDTH, HEIGHT, globals) => (ctx, vars) => {
	const { loc, createExplosion } = vars;
	const { BOSS_X: initialX, BOSS_Y: initialY, EARTH_X, EARTH_Y } = globals;
	const BOSS_Y = initialY + 30;
	const BOSS_X = initialX + 45;
	const distanceFromBossCenter = ({ x, y }) => ({ x: BOSS_X - x, y: BOSS_Y - y });
	const distanceFromEarthCenter = ({ x, y }) => ({ x: EARTH_X - x, y: EARTH_Y - y });
	const mirrorToEarthSide = ({ x, y }) => ({ x, y: EARTH_Y - y });
	let madness = bossMood.COOL;
	let missiles = [];

	class Missile {
    id = uuidv4()
    currentStatus = 'STARTING_PATH'
    bossSideControlPoint = {
    	x: randomBetween(100, WIDTH * 0.9),
    	y: randomBetween(distanceFromBossCenter({ x: EARTH_X, y: EARTH_Y }).y / -2, BOSS_Y)
    }
    location = 0;
    previousLocation = { x: 300, y: 120 }
		DX = randomBetween(0.001, 0.003)

    startPath = () => {
    	const earthSideControlPoint = mirrorToEarthSide(this.bossSideControlPoint);
    	const bossSideControlPoint = this.bossSideControlPoint;
    	ctx.beginPath();
    	ctx.strokeStyle = '#A63232';
    	ctx.setLineDash([2, 4, 6, 8]);
    	ctx.moveTo(BOSS_X, BOSS_Y);
    	ctx.bezierCurveTo(
    		bossSideControlPoint.x,
    		bossSideControlPoint.y,
    		earthSideControlPoint.x,
    		earthSideControlPoint.y,
    		EARTH_X,
    		EARTH_Y
    	);
    	ctx.stroke();
    	setTimeout(() => (this.currentStatus = 'FIRE'), 1000 * 2.5);
    }
    fire = () => {
    	const earthSideControlPoint = mirrorToEarthSide(this.bossSideControlPoint);
    	const bezierPath = bezierCubicCurve(
    		{ x: BOSS_X, y: BOSS_Y },
    		this.bossSideControlPoint,
    		earthSideControlPoint,
    		{ x: EARTH_X, y: EARTH_Y }
    	);
    	// const { getMouseMoveEvent } = events;
    	// const mouseMoveEvent = getMouseMoveEvent();
    	// const projectileLoc = { x: mouseMoveEvent.clientX, y: mouseMoveEvent.clientY };
    	const projectileLoc = bezierPath(this.location);
    	const slope = getSlope(this.previousLocation, projectileLoc);
    	const angle = getSlopeAngle(slope) + (slope > 0 ? 0 : Math.PI);
    	ctx.save();
    	ctx.beginPath();
    	ctx.translate(projectileLoc.x, projectileLoc.y);
    	ctx.rotate(angle - getRadian(90));
    	ctx.moveTo(0, 0);
    	ctx.lineTo(5, 0);
    	ctx.moveTo(0, 0);
    	ctx.lineTo(-5, 0);
    	ctx.lineTo(0, 15);
    	ctx.lineTo(5, 0);
    	ctx.fillStyle = '#FF6540';
    	ctx.fill();
    	ctx.stroke();
    	ctx.closePath();
    	ctx.restore();
    	this.location += this.DX;
    	const isClear = loc.reverse().every((sphere) => {
    		const { x: xFromEarth, y: yFromEarth } = distanceFromEarthCenter(projectileLoc);
    		const distanceFromEarth = (xFromEarth ** 2 + yFromEarth ** 2) ** 0.5;
    		if (distanceFromEarth <= sphere.r + 15 && distanceFromEarth >= sphere.r - 5) {
    			const angle = getDegrees(Math.atan(yFromEarth / xFromEarth));
    			const angleToEarth = 360 + angle - (angle < 0 ? 0 : 180) - (yFromEarth < 0 ? 180 : 0);
    			const hitAngle = roundDegrees(angleToEarth - sphere.getAngle());
    			return sphere.shields.every((shield) => hitAngle > shield.to || hitAngle < shield.from);
    		}
    		return true;
    	});
    	this.previousLocation = projectileLoc;
    	if (!isClear) this.currentStatus = 'DESTROY';
    }

    blow = () => {
    	createExplosion(this.previousLocation);
    }

    removePath = () => {
    }
    update = () => {
    	const directDistance = distanceFromEarthCenter(this.previousLocation);
    	if ((directDistance.x ** 2 + directDistance.y ** 2) ** 0.5 < 120) {
    		this.currentStatus = 'DESTROY';
    		const { damageEarth } = vars;
    		damageEarth(this.previousLocation);
    	}
    	if (getPlanetState() === 'healing' && Math.random() < 0.05) this.currentStatus = 'DESTROY';
    	switch (this.currentStatus) {
    	case 'STARTING_PATH': this.startPath(); break;
    	case 'FIRE': this.fire(); break;
    	case 'DESTROY': this.destroy();
    	}
    }
    destroy = () => {
    	this.blow();
    	missiles = missiles.filter((missile) => missile.id !== this.id);
    	this.currentStatus = undefined;
    }
	}

	recallEvery(
		() => missiles.push(new Missile()),
		() => console.log('madness', madness) || (1000 * missileFrequency[madness])
	);

	const animate = (storyOutput) => {
		madness = storyOutput.bossMood;
		if (storyOutput.rageFire) $20.forEach(() => missiles.push(new Missile()));
		missiles.forEach((missile) => missile.update());
	};

	const rageFire = () => $20.forEach(() => missiles.push(new Missile()));

	return [animate, rageFire];
};
