import animates from './animates';
import playStory from './story';
import drawBoss from './Boss';

export default (ctx, WIDTH, HEIGHT) => {
	return {
		animates: animates(WIDTH, HEIGHT),
		Boss: drawBoss(ctx, WIDTH, HEIGHT),
		playStory
	};
};
