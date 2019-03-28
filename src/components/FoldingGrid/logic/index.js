import drawGrid from './drawGrid';
import animates from './animates';

export default (ctx) => ({
	animates: animates(ctx),
	drawGrid: drawGrid(ctx)
});
