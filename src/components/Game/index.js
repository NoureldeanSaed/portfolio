import React, { Component } from 'react';

import { persistEvent } from '../../helpers';
import logic from './logic';

class Game extends Component {
  state = { mouseMoveEvent: { clientX: 0, clientY: 0 }, selection: [] }

  componentDidMount = () => {
  	window.onresize = () => {
  		this.forceUpdate();
  		const { cancelAnimationFrame } = this.state;
  		cancelAnimationFrame();
  		this.draw();
  	};
  	this.draw();
  }

  draw = () => {
  	const canvas = document.getElementById('game');
  	const ctx = canvas.getContext('2d');
  	const { width: WIDTH, height: HEIGHT } = canvas;
  	const {
  		playStory,
  		animates,
  		Boss
  	} = logic(ctx, WIDTH, HEIGHT);
  	console.log('Boss', Boss);
  	Boss.draw();
  	// const cancelAnimationFrame = animates(
  	// 	ctx,
  	// 	() => playStory(),
  	// );
  	this.setState((state) => ({ ...state, cancelAnimationFrame }));
  }

  getMouseMoveEvent = () => this.state.mouseMoveEvent

  getWidth = () => window.innerWidth

  getHeight = () => window.innerHeight

  onMouseMove = (ev) => {
  	const persisted = persistEvent(ev);
  	this.setState((state) => ({ ...state, mouseMoveEvent: persisted }));
  }

  render () {
  	const { selection } = this.state;
  	return (
  		<canvas
  			id='game'
  			width={this.getWidth()}
  			height={this.getHeight() - 28}
  			onMouseMove={this.onMouseMove}
  			onClick={this.destroyFactory}
  			style={{ cursor: selection.length > 0 ? 'pointer' : 'auto' }}
  		>Please enable javascript in your browser</canvas>
  	);
  }
}

export default Game;
