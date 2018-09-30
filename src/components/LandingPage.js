import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const LandingPage = props => {
  return (
    <div className="screen screen-start" id="start">
      <header>
        <h1>Tic Tac Toe</h1>
        <Link to="/1p" className="button oneP" onClick={() => props.reset("onePlayer")}>One Player Game</Link>
        <Link to="/play" className="button twoP" onClick={props.reset}>Two Player Game</Link>
      </header>
    </div>
  );
};

LandingPage.propTypes = {
  reset: PropTypes.func.isRequired,
}

export default LandingPage;
