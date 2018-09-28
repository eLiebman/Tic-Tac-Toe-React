import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import DelayLink from './DelayLink';

const DifficultySelect = props => {
  return (
    <div className="screen" id="difficultySelect">
        <h1 className="difficulty-header">Select Difficulty</h1>
        <DelayLink to="/play" id="easy"
                    className={`diff ${props.diff==="easy"?"diff-active":""}`}
                    onDelayStart={ () => props.setDifficulty("easy")}
                    delay={800} > Easy </DelayLink>
        <DelayLink to="/play" id="medium"
                    className={`diff ${props.diff==="medium"?"diff-active":""}`}
                    onDelayStart={ () => props.setDifficulty("medium")}
                    delay={800} > Medium </DelayLink>
        <DelayLink to="/play" id="hard"
                    className={`diff ${props.diff==="hard"?"diff-active":""}`}
                    onDelayStart={ () => props.setDifficulty("hard")}
                    delay={800} > Hard </DelayLink>

    </div>
  );
};

DifficultySelect.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  diff: PropTypes.string.isRequired
}

export default DifficultySelect;
