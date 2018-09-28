import React from 'react';
import PropTypes from 'prop-types';

// App Components
import Header from './Header';
import Board from './Board';

const Game = props => {
  return (
      <div className="board" id="board">
        <Header name={props.name} player={props.player} reset={props.reset}/>
        <Board boxes={props.board} move={props.move}/>
      </div>
  );
}

Game.propTypes = {
  board: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  move: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired
}

export default Game;
