export const bossMood = Object.freeze({ COOL: 0, MAD: 1, PISSED: 2 });
let madnessLevel = bossMood.COOL;
const pissOff = () => (madnessLevel = Math.round((madnessLevel + 0.1) * 10) / 10);
const coolDown = () => (madnessLevel = Math.round((madnessLevel - 0.1) * 10) / 10);

/*
 *  @params ctx {Object} canvas' 2d context object
 *  @params madness {Number} one of bossMood
 */
export default (WIDTH, HEIGHT, globals) => (ctx) => {
	const { BOSS_X, BOSS_Y } = globals;
	const bossProps = Object.freeze({
		BOSS_WIDTH: 90,
		BOSS_HEIGHT: 60,
		FORHEAD_HEIGHT: 15,
		EYE_WIDTH: 25,
		EYE_HEIGHT: 15,
		EYE_SPACING: 10,
		EYE_X: 15
	});
	const draw = (storyOutput) => {
		const { bossMood: madness = bossMood.COOL } = storyOutput;
		// Background
		// const gradient = ctx.createRadialGradient(
		// 	BOSS_X + bossProps.BOSS_WIDTH / 2,
		// 	BOSS_Y + bossProps.BOSS_HEIGHT / 2,
		// 	bossProps.BOSS_WIDTH * 0.1,
		// 	BOSS_X + bossProps.BOSS_WIDTH / 2,
		// 	BOSS_Y + bossProps.BOSS_HEIGHT / 2,
		// 	bossProps.BOSS_WIDTH * 1.2
		// );
		// gradient.addColorStop(0, '#C12F2A');
		// gradient.addColorStop(1, '#00000000');
		// ctx.fillStyle = gradient;
		// ctx.fillRect(0, 0, WIDTH, HEIGHT);
		if (madnessLevel < madness) pissOff();
		if (madnessLevel > madness) coolDown();
		// Body
		ctx.beginPath();
		ctx.setLineDash([]);
		ctx.rect(BOSS_X, BOSS_Y, bossProps.BOSS_WIDTH, bossProps.BOSS_HEIGHT);
		ctx.strokeStyle = '#292929';
		ctx.stroke();
		ctx.fillStyle = '#292929';
		ctx.fill();
		// Eyes
		ctx.beginPath();
		ctx.rect(
			BOSS_X + bossProps.EYE_X,
			BOSS_Y + bossProps.FORHEAD_HEIGHT,
			bossProps.EYE_WIDTH,
			bossProps.EYE_HEIGHT
		);
		ctx.fillStyle = '#FFFFFF';
		ctx.fill();
		ctx.beginPath();
		ctx.rect(
			BOSS_X + bossProps.EYE_WIDTH + bossProps.EYE_SPACING + bossProps.EYE_X,
			BOSS_Y + bossProps.FORHEAD_HEIGHT, bossProps.EYE_WIDTH, bossProps.EYE_HEIGHT
		);
		ctx.fillStyle = '#FFFFFF';
		ctx.fill();
		// Angry eyebrow
		ctx.beginPath();
		ctx.moveTo(BOSS_X + bossProps.EYE_X, BOSS_Y + bossProps.FORHEAD_HEIGHT);
		ctx.lineTo(
			BOSS_X + bossProps.BOSS_WIDTH / 2,
			BOSS_Y + bossProps.FORHEAD_HEIGHT + (bossProps.EYE_HEIGHT * madnessLevel / 2)
		);
		ctx.lineTo(
			BOSS_X + (bossProps.EYE_WIDTH * 2) + bossProps.EYE_X + bossProps.EYE_SPACING,
			BOSS_Y + bossProps.FORHEAD_HEIGHT
		);
		ctx.fillStyle = '#292929';
		ctx.fill();
		ctx.save();
	};

	const animate = (bossMood) => draw(bossMood);

	return animate;
};
