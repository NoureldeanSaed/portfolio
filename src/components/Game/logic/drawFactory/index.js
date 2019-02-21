import { getRadian } from '../../../../helpers';

export default (ctx) => class Factory {

		angle = 0;

		draw = (factoryProps, scaleFactor = 1) => {
			const { x, y: initialY, width, length } = factoryProps;
			const y = initialY - 10;
			scaleFactor -= 0.2;
			if (scaleFactor < 0.4) this.update = () => {};
			ctx.save();
			ctx.setLineDash([]);
			ctx.strokeStyle = '#333';
			ctx.beginPath();
			ctx.moveTo(x + (40 * scaleFactor), y + (40 * scaleFactor));
			ctx.lineWidth = 2;
			ctx.bezierCurveTo(
				x + (35 * scaleFactor), y + (35 * scaleFactor),
				x + (32 * scaleFactor), y + (12 * scaleFactor),
				x + (32 * scaleFactor), y + (2 * scaleFactor)
			);
			ctx.lineTo(x + (8 * scaleFactor), y + (2 * scaleFactor));
			ctx.bezierCurveTo(
				x + (8 * scaleFactor), y + (12 * scaleFactor),
				x + (5 * scaleFactor), y + (35 * scaleFactor),
				x, y + (40 * scaleFactor)
			);
			ctx.closePath();
			ctx.fillStyle = '#e1b927';
			ctx.fill();
			ctx.stroke();
			// ctx.clip();

			ctx.beginPath();
			ctx.lineTo(x + (20 * scaleFactor), y + (20 * scaleFactor));
			ctx.arc(
				x + (20 * scaleFactor),
				y + (20 * scaleFactor),
				(10 * scaleFactor),
				getRadian(this.angle),
				getRadian(60 + this.angle)
			);
			ctx.fillStyle = '#000';
			ctx.fill();

			ctx.beginPath();
			ctx.lineTo(x + (20 * scaleFactor), y + (20 * scaleFactor));
			ctx.arc(
				x + (20 * scaleFactor),
				y + (20 * scaleFactor),
				(10 * scaleFactor),
				getRadian(120 + this.angle),
				getRadian(180 + this.angle)
			);
			ctx.fillStyle = '#000';
			ctx.fill();

			ctx.beginPath();
			ctx.lineTo(x + (20 * scaleFactor), y + (20 * scaleFactor));
			ctx.arc(
				x + (20 * scaleFactor),
				y + (20 * scaleFactor),
				(10 * scaleFactor),
				getRadian(240 + this.angle),
				getRadian(300 + this.angle)
			);
			ctx.fillStyle = '#000';
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = '#e1b927';
			ctx.arc(x + (20 * scaleFactor), y + (20 * scaleFactor), (4 * scaleFactor), 0, getRadian(360));
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = '#000';
			ctx.arc(x + (20 * scaleFactor), y + (20 * scaleFactor), (2 * scaleFactor), 0, getRadian(360));
			ctx.fill();
			ctx.restore();
		}

		update = (factoryProps, scaleFactor) => {
			this.angle += 2;
			if (this.angle === 120) this.angle = 0;
			this.draw(factoryProps, scaleFactor);
		}
};
