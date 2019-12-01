import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import { Home } from './components';
import * as PIXI from 'pixi.js';

import './index.less';

class App extends Component {
	state = {}

	change = (key) => (value) => this.setState({ [key]: value })

	render () {
		const app = new PIXI.Application();
		document.getElementById('app').appendChild(app.view);
		console.log({ app });
		let count = 0;

		// build a rope!
		const ropeLength = 918 / 20;

		const points = [];

		for (let i = 0; i < 20; i++)
			points.push(new PIXI.Point(i * ropeLength, 0));


		const strip = new PIXI.SimpleRope(PIXI.Texture.from('dist/public/snake.png'), points);

		strip.x = -459;

		const snakeContainer = new PIXI.Container();
		snakeContainer.x = 400;
		snakeContainer.y = 300;

		snakeContainer.scale.set(800 / 1100);
		app.stage.addChild(snakeContainer);

		snakeContainer.addChild(strip);

		app.ticker.add(() => {
			count += 0.1;

			// make the snake
			for (let i = 0; i < points.length; i++) {
				points[i].y = Math.sin((i * 0.5) + count) * 30;
				points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
			}
		});

	  return (
			<div className='app'>
				{/*<Home />*/}
		 	</div>
	  );
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
