import React from 'react';
import PropTypes from 'prop-types';

// App Components
import Header from './Header';
import Board from './Board';

const Game = props => {
  return (
      <div className="board">
        <Header player={props.player} reset={props.reset}/>
        <Board boxes={props.board} move={props.move}/>
      </div>
  );
}

Game.propTypes = {
  player: PropTypes.string.isRequired,
  board: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired
}

export default Game;
