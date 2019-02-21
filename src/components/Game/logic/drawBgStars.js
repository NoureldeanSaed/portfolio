import { $50, randomBetween, getRadian } from '../../../helpers';

export default (WIDTH, HEIGHT) => (ctx) => {
	class Particle {
		constructor () {
			this.x = randomBetween(0, WIDTH);
			this.y = randomBetween(0, HEIGHT);
			this.r = ~~Math.random() ? randomBetween(0, 3) : randomBetween(0, 2);
		}

    draw = () => {
    	ctx.save();
    	ctx.moveTo(this.x, this.y);
    	ctx.beginPath();
    	ctx.arc(this.x, this.y, this.r, 0, getRadian(360));
    	ctx.fillStyle = '#FFF';
    	ctx.fill();
    	ctx.closePath();
    	ctx.restore();
    }

    update = () => {
    	this.draw();
    }
	}

	const particles = $50.map(() => new Particle());

	const animate = () => {
		particles.forEach((particle) => {
			particle.update();
		});
	};

	return animate;
};
