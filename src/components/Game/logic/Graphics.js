import { graphics as constants } from './constants';

export default (ctx) => new (class Graphics {
  scale = (x, y) => [x * constants.DEL, y * constants.DEL]

  drawDot = (xi = 0, yi = 0) => {
  	const { DEL } = constants;
  	const { x, y } = this.scale(xi, yi);
  	ctx.rect(x - DEL / 2, y - DEL / 2, DEL, DEL);
  }
  rect = (xi = 0, yi = 0, wi = 0, hi = 0) => {
  	const { DEL } = constants;
  	const [x, y] = this.scale(xi, yi);
  	const [w, h] = this.scale(wi, hi);
  	console.log('hi', hi);
  	console.log('h', h);
  	ctx.rect(
  		x - DEL,
  		y - DEL,
  		w,
  		h
  	);
  }
  fill = (fillStyle = '#FFF') => {
  	ctx.fillStyle = fillStyle;
  	ctx.fill();
  }
})();
