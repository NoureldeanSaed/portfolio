import React, { Component } from 'react';

import { persistEvent } from '../../helpers';
import logic from './logic';

import './index.less';

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
  	const actions = {
  		getMouseMoveEvent: this.getMouseMoveEvent,
  		selectFactory: (landId) => {
  			const { selection } = this.state;
  			const updatedSelection = selection.includes(landId) ? selection : [...selection, landId];
  			this.setState((state) => ({ ...state, selection: updatedSelection }));
  		},
  		deselectFactory: (landId) => {
  			const { selection } = this.state;
  			const updatedSelection = selection.filter((land) => land !== landId);
  			this.setState((state) => ({ ...state, selection: updatedSelection }));
  		},
  		getSelection: () => this.state.selection
  	};
  	const {
  		playStory,
  		animates,
  		drawBoss,
  		drawEarth,
  		drawMissiles,
  		drawAtmosphere,
  		drawBgStars,
  		drawExplosions
  	} = logic(WIDTH, HEIGHT, actions);
  	const backgroundStarsAnimations = drawBgStars(ctx);
  	const bossAnimations = drawBoss(ctx);
  	const [earthAnimations, { damageEarth, createFactory, destroyFactory }] = drawEarth(ctx);
  	const [atmosphereAnimations, loc] = drawAtmosphere(ctx);
  	const [explosionsAnimations, createExplosion] = drawExplosions(ctx);
  	const [missilesAnimations, rageFire] = drawMissiles(ctx, { loc, createExplosion, damageEarth });
  	const storyFunctions = { rageFire, createFactory };
  	const cancelAnimationFrame = animates(
  		ctx,
  		() => playStory(storyFunctions),
  		backgroundStarsAnimations,
  		missilesAnimations,
  		earthAnimations,
  		bossAnimations,
  		atmosphereAnimations,
  		explosionsAnimations
  	);
  	this.destroyFactory = () => {
  		this.setState((state) => ({ ...state, selection: [] }));
  		destroyFactory(this.state.selection[0]);
  	};
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
