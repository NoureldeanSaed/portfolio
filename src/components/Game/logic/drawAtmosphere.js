import { randomBetween, getDegrees, getRadian } from '../../../helpers';


export default (WIDTH, HEIGHT, globals) => (ctx) => {
	const { EARTH_X, EARTH_Y } = globals;

	class Sphere {
		angle = randomBetween(0, 360);
		lineDash = [64, 512, 128, 256];
		shields = [];

		constructor (r, bg) {
			this.r = r;
			this.bg = bg;
			let degrees = 0;
			let dashIndex = 0;
			while (degrees <= 360) {
				const sector = getDegrees(this.lineDash[dashIndex] / r);
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
			this.draw();
		}

		getAngle = () => this.angle

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
