import { randomBetween, getDegrees, getRadian } from '../../../helpers';
import { getPollution, getPlanetState } from './drawEarth';

const defaultDash = [64, 512, 128, 256];

export default (WIDTH, HEIGHT, globals) => (ctx) => {
	const { EARTH_X, EARTH_Y } = globals;

	class Sphere {
		angle = randomBetween(0, 360);
		lineDash = defaultDash;
		shields = [];

		constructor (r, bg) {
			this.r = r;
			this.bg = bg;
			const degrees = 0;
			const dashIndex = 0;
			this.calculateShields();
		}

		draw = () => {
			ctx.save();
			ctx.beginPath();
			ctx.translate(EARTH_X, EARTH_Y);
			ctx.rotate(getRadian(this.angle));
			ctx.arc(0, 0, this.r, 0, Math.PI * 2, 0);
			ctx.setLineDash(this.lineDash);
			ctx.strokeStyle = this.bg;
			ctx.lineWidth = 5;
			ctx.stroke();
			ctx.closePath();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.restore();
		}

		update = () => {
			if (this.angle >= 360) this.angle = 0;
			else if (this.angle <= 0) this.angle = 360;
			this.angle += this.DA;
			if (getPlanetState() === 'infected') {
				if (getPollution() < 0.5) this.incLineDash();
				else if (getPollution() > 0.5) this.decLineDash();
			} else if (getPollution() > 0.5) {
				 this.incLineDash();
			}
			this.draw();
		}

		getAngle = () => this.angle

		incLineDash = () => {
			this.lineDash = [
				this.lineDash[0] <= defaultDash[0] * 1.5 ? this.lineDash[0] + 1 : defaultDash[0] * 1.5,
				this.lineDash[1] >= defaultDash[1] ? this.lineDash[1] - 1 : defaultDash[1],
				this.lineDash[2] <= defaultDash[2] * 1.5 ? this.lineDash[2] + 1 : defaultDash[2] * 1.5,
				this.lineDash[3] >= defaultDash[3] ? this.lineDash[3] - 1 : defaultDash[3]
			];
			this.calculateShields();
		}

		decLineDash = () => {
			this.lineDash = [
				this.lineDash[0] >= defaultDash[0] ? this.lineDash[0] - 1 : defaultDash[0],
				this.lineDash[1] <= defaultDash[1] * 2 ? this.lineDash[1] + 1 : defaultDash[1] * 2,
				this.lineDash[2] >= defaultDash[2] ? this.lineDash[2] - 1 : defaultDash[2],
				this.lineDash[3] <= defaultDash[3] * 2 ? this.lineDash[3] + 1 : defaultDash[3] * 2
			];
			this.calculateShields();
		}

		calculateShields = () => {
			let degrees = 0;
			let dashIndex = 0;
			this.shields = [];
			while (degrees <= 360) {
				const sector = getDegrees(this.lineDash[dashIndex] / this.r);
				if (dashIndex % 2 === 0) {
					this.shields.push({
						from: degrees,
						to: sector + degrees <= 360 ? sector + degrees : 360
					});
				}
				degrees += sector;
				if (dashIndex < this.lineDash.length - 1) dashIndex++;
				else dashIndex = 0;
			}
		}

		DA = randomBetween(-0.4, 0.4);
	}

	const spheres = [
		new Sphere(150, '#FCDF06'),
		new Sphere(150, '#FCFF06'),
		new Sphere(170, '#60a4c1'),
		new Sphere(170, '#60a4F1'),
		new Sphere(200, '#BFB932'),
		new Sphere(200, '#FFB932'),
		new Sphere(250, '#3278ef'),
		new Sphere(250, '#555554')
	];

	const animate = () => {
		spheres.forEach((sphere) => sphere.update());
	};
	return [animate, spheres];
};
