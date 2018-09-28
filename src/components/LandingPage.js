import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const LandingPage = props => {
  return (
    <div className="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <Link to="/1p" className="button oneP" onClick={props.setOnePlayer}>One Player Game</Link>
        <Link to="/play" className="button twoP">Two Player Game</Link>
      </header>
    </div>
  );
};

LandingPage.propTypes = {
  setOnePlayer: PropTypes.func.isRequired,
}

export default LandingPage;
