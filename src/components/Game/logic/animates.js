let previousFrameTime = 0;

let FPS = 0;
let minFPS = 0;
let maxFPS = 0;
let noFrames = 0;
let sumFrames = 0;

export const getFPS = () => FPS;

export default (WIDTH, HEIGHT) => (ctx, playStory, ...animations) => {
	let frameId;
	// eslint-disable-next-line no-unused-vars
	const drawFramesPerSecond = () => {
		ctx.font = '50px serif';
		ctx.fillStyle = 'red';
		ctx.fillText(FPS, 100, 100);
		ctx.fillText(`Min: ${minFPS}`, 100, 150);
		ctx.fillText(`Max: ${maxFPS}`, 100, 200);
		ctx.fillText(`Avg: ${sumFrames / noFrames}`, 100, 250);
	};
	const run = (time) => {
		FPS = Math.floor(1000 / (time - (previousFrameTime || 0)));
		noFrames++;
		sumFrames += FPS || 0;
		if (time > 1000 && time < 1100) minFPS = FPS;
		minFPS = minFPS > FPS ? FPS : minFPS;
		maxFPS = maxFPS < FPS ? FPS : maxFPS;
		previousFrameTime = time;
		frameId = requestAnimationFrame(run);
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		const storyOutput = playStory();
		animations.forEach((animation) => animation(storyOutput));
		// drawFramesPerSecond();
		ctx.restore();
	};
	run();
	return () => window.cancelAnimationFrame(frameId);
};
