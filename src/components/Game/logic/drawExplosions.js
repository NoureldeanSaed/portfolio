// Inspired by https://codepen.io/enxaneta/pen/woBzzy?editors=0010
import uuidv4 from 'uuid/v4';

import { randomBetween, $50 } from '../../../helpers';

export default () => (ctx) => {
	const colors = ['#6A0000', '#900000', '#902B2B', '#A63232',
		'#A62626', '#FD5039', '#C12F2A', '#FF6540', '#f93801'];
	const spring = 1 / 10;
	const friction = 0.85;
	let explosions = [];
	class Particles {
		constructor (pos) {
			this.decay = 0.92; //randomIntFromInterval(80, 95)/100;//
			this.r = randomBetween(5, 20);
			this.R = 30 - this.r;
			this.angle = Math.random() * 2 * Math.PI;
			this.center = pos; //{x:cx,y:cy}
			this.pos = {};
			this.pos.x = this.center.x + this.r * Math.cos(this.angle);
			this.pos.y = this.center.y + this.r * Math.sin(this.angle);
			this.dest = {};
			this.dest.x = this.center.x + this.R * Math.cos(this.angle);
			this.dest.y = this.center.y + this.R * Math.sin(this.angle);
			this.color = colors[~~(Math.random() * colors.length)];
			this.vel = {
				x: 0,
				y: 0
			};
			this.acc = {
				x: 0,
				y: 0
			};
		}

    update = () => {
    	const dx = (this.dest.x - this.pos.x);
    	const dy = (this.dest.y - this.pos.y);

    	this.acc.x = dx * spring;
    	this.acc.y = dy * spring;
    	this.vel.x += this.acc.x;
    	this.vel.y += this.acc.y;

    	this.vel.x *= friction;
    	this.vel.y *= friction;

    	this.pos.x += this.vel.x;
    	this.pos.y += this.vel.y;

    	this.r *= this.decay;
    }

    draw = () => {
    	ctx.fillStyle = this.color;
    	ctx.beginPath();
    	ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    	ctx.fill();
    }
	}

	class Explosion {
    id = uuidv4();

    constructor (pos) {
    	this.pos = pos;
    	this.particles = $50.map(() => new Particles(pos));
    }

    update = () => {
    	this.particles = this.particles.filter((particle) => {
    		particle.draw();
    		particle.update();
    		return particle.r > 0.5;
    	});
    }

    draw = () => this.particles.length > 0
    	? this.particles.forEach((particle) => particle.draw())
    	: this.destroy();

    destroy = () => (explosions = explosions.filter((exp) => exp.id !== this.id))
	}

	const createExplosion = (pos) => explosions.push(new Explosion(pos));

	const animate = () => {
		explosions.forEach((explosion) => explosion.draw() || explosion.update());
	};

	return [animate, createExplosion];
};
