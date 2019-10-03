// Imitate movement here
// https://i.pinimg.com/originals/ad/ed/78/aded78f335851c3947d8f56239308a62.gif

export default ({ WIDTH, HEIGHT }, ctx) => () => {
	// baseline
	ctx.strokeStyle = 'yellow';
	ctx.moveTo(0, 400);
	ctx.lineTo(WIDTH, 400);
	ctx.stroke();

	const drawLine = (x1, y1, x2, y2) => {
		ctx.moveTo(x1, y1);
		ctx.arc(x1, y1, 10, 0, 2 * Math.PI);
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
		ctx.moveTo(x2, y2);
		ctx.stroke();
	};
	const nextLine = (x2, y2) => {
		ctx.lineTo(x2, y2);
		ctx.arc(x2, y2, 10, 0, 2 * Math.PI);
		ctx.stroke();
	};
	drawLine(1100, 300, 1000, 280);		//	-	neck bone
	nextLine(770, 295);								//	-	backbone 1
	nextLine(600, 305);								//	-	backbone 2
	drawLine(1000, 280, 960, 330);		//	-	rf shoulder to knee bone
	nextLine(1020, 490);							//	-	rf knee to paw bone
	drawLine(1000, 280, 940, 320);		// 	- lf shoulder to knee bone
	nextLine(980, 485);								// 	- lf knee to paw bone

};
