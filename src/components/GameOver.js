import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const GameOver = props => {
  return(
    <div className={`screen screen-win screen-win-${props.winner}`} >
      <header>
        <h1><Link to="/" onClick={props.reset}>Tic Tac Toe</Link></h1>
        <p>{props.message}</p>

        <Link to="/play" className="button"
                         onClick={ () => props.reset("onePlayer")} > New One Player Game </Link>

    		<Link to="/play" className="button"
                         onClick={ () => props.reset()} > New Two Player Game </Link>
      </header>
    </div>
  );
}

GameOver.propTypes = {
  winner: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

export default GameOver;
