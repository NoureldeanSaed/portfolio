import Graphics from './Graphics';
import { boss as constants } from './constants';

export default (ctx, WIDTH, HEIGHT) => {
	const G = new Graphics(ctx);
	return new (
		class Boss {
      draw = () => {
    		G.drawDot(120, 100);
      	G.drawDot(140, 120);
      	G.fill('red');
      	G.rect(10, 15, 1, 1);
      	G.fill('green');
      }
		}
	)();
};
