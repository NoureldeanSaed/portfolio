import React, { Component } from 'react';

import { persistEvent } from '../../helpers';
import logic from './logic';

class Game extends Component {
  state = { mouseMoveEvent: undefined }

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
  		drawBoss,
  		drawEarth,
  		drawMissiles,
  		drawAtmosphere,
  		drawBgStars,
  		drawExplosions
  	} = logic(WIDTH, HEIGHT, this.getMouseMoveEvent);
  	const backgroundStarsAnimations = drawBgStars(ctx);
  	const bossAnimations = drawBoss(ctx);
  	const [earthAnimations, damageEarth] = drawEarth(ctx);
  	const [atmosphereAnimations, loc] = drawAtmosphere(ctx);
  	const [explosionsAnimations, createExplosion] = drawExplosions(ctx);
  	const missilesAnimations = drawMissiles(ctx, { loc, createExplosion, damageEarth });
  	const cancelAnimationFrame = animates(
  		ctx,
  		playStory,
  		backgroundStarsAnimations,
  		missilesAnimations,
  		earthAnimations,
  		bossAnimations,
  		atmosphereAnimations,
  		explosionsAnimations
  	);
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
  	return (
  		<canvas
  			id='game'
  			width={this.getWidth()}
  			height={this.getHeight() - 28}
  			onMouseMove={this.onMouseMove}
  		>Please enable javascript in your browser</canvas>
  	);
  }
}

export default Game;
