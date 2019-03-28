export default (ctx) => (...animations) => {
	console.log('animations', animations);
	animations.forEach((animate) => animate());
};
