import React, { Component } from 'react';

import { persistEvent } from '../../helpers';
import logic from './logic';

class Game extends Component {
  state = { mouseMoveEvent: { clientX: 0, clientY: 0 }, selection: [] }

  componentDidMount () {
  	this.draw();
  }

  draw = () => {
  	const dimentions = { WIDTH: this.getWidth(), HEIGHT: this.getHeight() };
  	const canvas = document.getElementById('game');
  	const context = canvas.getContext('2d');
  	const { felidaeSkeletonWalking } = logic(dimentions, context);
  	felidaeSkeletonWalking();
  }

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
