const directions = Object.freeze({ NONE: 0, UP: 1, RIGHT: 2, BOTTOM: 3, LEFT: 4 });
const OPEN = 1;
const CLOSED = 0;

export default (ctx) => (gridProps) => {
	console.log('gridProps', gridProps);
	const { cell, levels, getStatus, timeout } = gridProps;
	const currentStatus = 0;

	const gridHeight = levels.length * cell.height;
	const gridWidth = levels[0].length * cell.width;

	class Cell {
		transiting = false;
		isVisible = CLOSED;
		direction = directions.NONE;
		decreasedX = 0;
		decreasedY = 0;

		constrcutor ({ x, y }, isVisible) {
			this.x = x;
			this.y = y;
			this.width = cell.width;
			this.height = cell.height;
			if (isVisible) {
				if (Math.random() > 0.5) this.decreasedX = this.width;
				else this.decreasedY = this.height;
			}
			this.isVisible = isVisible;
		}

		draw = () => {
			const { x, y, width, height, decreasedX, decreasedY, direction } = this;
			switch (direction) {
			case directions.UP:
				ctx.rect(x, y, width, height - decreasedY);
				break;
			case directions.DOWN:
				ctx.rect(x, y + decreasedY, width, height - decreasedY);
				break;
			case directions.LEFT:
				ctx.rect(x, y, width - decreasedX, height);
				break;
			case directions.RIGHT:
				ctx.rect(x + decreasedX, y, width - decreasedX, height);
				break;
			default:
				ctx.rect(x, y, width, height);
			}
			ctx.fillColor = 'blue';
			ctx.fill();
		}

		update = () => {
			const { direction, transiting, isVisible } = this;
			const INC = 0.1;
			if (transiting) {
				// We want it to transition to OPEN
				if (isVisible) {
					if ([directions.UP, directions.DOWN].includes(direction)) {
						this.decreasedY = this.decreasedY + INC > cell.height
							? cell.height : this.decreasedY + INC;
					} else if ([directions.RIGHT, directions.LEFT].includes(direction)) {
						this.decreasedX = this.decreasedX + INC > cell.width
							? cell.width : this.decreasedY + INC;
					}
				// We want it to transition to CLOSED
				} else {
					if ([directions.UP, directions.DOWN].includes(direction)) {
						this.decreasedY = this.decreasedY - INC < 0
							? 0 : this.decreasedY - INC;
					} else if ([directions.RIGHT, directions.LEFT].includes(direction)) {
						this.decreasedX = this.decreasedX - INC < 0
							? 0 : this.decreasedX - INC;
					}
				}
				this.draw();
			}
		}

		setDirection = (dir) => (this.direction = dir)

		setTransition = (transition) => (this.transiting = transition)
	}

	class Grid {
		constructor () {
			const cells = [[]];
			levels.forEach((row, rowIndex) =>
				row.forEach((col, colIndex) => {
					col.forEach((visibility) => {
						const cellCoords = { x: cell.width * colIndex, y: cell.height * rowIndex };
						if (!cells[rowIndex]) cells[rowIndex] = [];
						cells[rowIndex][colIndex] = new Cell(cellCoords, visibility);
					});
				}));
			this.cells = cells;
			console.log('cells', cells);
		}

		draw = () => this.cells.forEach((row) => row.forEach((cell) => cell.draw()))

		update = () => this.cells.forEach((row) => row.forEach((cell) => cell.update()))
	}

	const grid = new Grid();

	grid.draw();
	const animate = () => grid.update();

	return [animate];
};


function calc (a) {
	for (let x = 0; x < a.length; x++) {
		for (let b = 0; b < a.length; b++) {
			for (let c = 0; c < a.length; c++)
				if (c % 2 === 0) console.log();
		}
	}

}
