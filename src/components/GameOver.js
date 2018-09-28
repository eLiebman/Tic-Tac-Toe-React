import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const GameOver = props => {
  return(
    <div className={`screen screen-win screen-win-${props.winner}`} id="finish">
      <header>
        <h1><Link to="/" onClick={props.reset}>Tic Tac Toe</Link></h1>
        <p className="message">{!props.winner
                                ?"It's a tie!"
                                :!props.onePlayerMode
                                ?"You've Won!"
                                :props.winner==="x"
                                ?"You've Lost..."
                                :"You've Won!"}</p>

        <Link to="/play" className="button oneP"
                         onClick={ () => props.reset("onePlayer")} > New One Player Game </Link>
    		<Link to="/play" className="button twoP"
                         onClick={ () => props.reset()} > New Two Player Game </Link>
      </header>
    </div>
  );
}

GameOver.propTypes = {
  winner: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  name: PropTypes.string,
  setOnePlayer: PropTypes.func.isRequired,
  onePlayerMode: PropTypes.bool.isRequired
}

export default GameOver;
