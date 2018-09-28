import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const EnterName = props => {
  return (
    <div className="screen" id="difficultySelect">
      <h1> Enter Your Name </h1>

      <input type="text" autofocus="true" value={props.name}
                         onChange={ e => props.updateName(e.target.value) } />

      <h2 className="difficulty-header">Select Difficulty</h2>
      <a href="#" className="diff" id="easy"   onClick={ () => props.setDifficulty("easy")} > Easy </a>
      <a href="#" className="diff" id="medium" onClick={ () => props.setDifficulty("medium")} > Medium </a>
      <a href="#" className="diff" id="hard"   onClick={ () => props.setDifficulty("hard")} > Hard </a><br />

      <Link to="/play" className="button play"> Play </Link>
    </div>
  );
};

EnterName.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default EnterName;
