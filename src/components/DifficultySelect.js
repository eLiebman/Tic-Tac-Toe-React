import React from 'react';
import PropTypes from 'prop-types';

import DelayLink from './third-party/DelayLink';

const DifficultySelect = props => {
  return (
    <div className="screen screen-difficultySelect">
        <h1>Select Difficulty</h1>
        {props.levels.map(level => {
          return <DelayLink to="/play"
                            className={`button ${props.diff===level?"diff-active":""}`}
                            onDelayStart={ () => props.setDifficulty(level)}
                            delay={800} > { level[0].toUpperCase() + level.slice(1) } </DelayLink>
                          })
        }
    </div>
  );
};

DifficultySelect.propTypes = {
  setDifficulty: PropTypes.func.isRequired,
  diff: PropTypes.string.isRequired,
  levels: PropTypes.array.isRequired
}

export default DifficultySelect;
