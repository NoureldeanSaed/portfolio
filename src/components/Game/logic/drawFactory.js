import { getRadian } from '../../../helpers';

export default (ctx) => class Factory {
		angle = 0;
		currentScaleFactor = 0;

		constructor (landId, scaleFactor, functions) {
			this.id = landId;
			this.scaleFactor = scaleFactor;
			this.getMouseMoveEvent = functions.getMouseMoveEvent;
			this.factoryActions = functions.factoryActions;
		}

		draw = (factoryProps) => {
			const {
				currentScaleFactor: scaleFactor = 1,
				getMouseMoveEvent,
				factoryActions: { selectFactory, deselectFactory, getSelection }
			} = this;
			const { x, y: initialY, width, length } = factoryProps;
			const y = initialY - 10;
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

			const { clientX: mouseX, clientY: mouseY } = getMouseMoveEvent();
			if (ctx.isPointInPath(mouseX, mouseY)) selectFactory(this.id);
			else deselectFactory(this.id);

			ctx.closePath();
			ctx.fillStyle = '#E1B927';
			ctx.fill();
			ctx.stroke();

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
			ctx.fillStyle = '#E1B927';
			ctx.arc(x + (20 * scaleFactor), y + (20 * scaleFactor), (4 * scaleFactor), 0, getRadian(360));
			ctx.fill();

			ctx.beginPath();
			ctx.fillStyle = '#000';
			ctx.arc(x + (20 * scaleFactor), y + (20 * scaleFactor), (2 * scaleFactor), 0, getRadian(360));
			ctx.fill();
			ctx.restore();
		}

		update = (factoryProps) => {
			this.angle += 2;
			if (this.currentScaleFactor < this.scaleFactor) this.currentScaleFactor += 0.02;
			if (this.angle === 120) this.angle = 0;
			this.draw(factoryProps);
		}
};
