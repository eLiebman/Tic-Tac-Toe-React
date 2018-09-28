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
      <a href="#" id="easy"
                  className={`diff ${props.diff==="easy"?"diff-active":""}`}
                  onClick={ () => props.setDifficulty("easy")} > Easy </a>
      <a href="#" id="medium"
                  className={`diff ${props.diff==="medium"?"diff-active":""}`}
                  onClick={ () => props.setDifficulty("medium")} > Medium </a>
      <a href="#" id="hard"
                  className={`diff ${props.diff==="hard"?"diff-active":""}`}
                  onClick={ () => props.setDifficulty("hard")} > Hard </a><br />

      <Link to="/play" className="button play"> Play </Link>
    </div>
  );
};

EnterName.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  diff: PropTypes.string.isRequired
}

export default EnterName;
