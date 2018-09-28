import React from 'react';
import PropTypes from 'prop-types';

import Box from './Box';

const Board = props => {
  return (
    <ul className="boxes">
      {
        props.boxes.map(( box, index ) => {
                      return (
                        <Box move={ () => props.move(index) }
                             contents={ props.boxes[index] } />
                      )
                    })
      }
    </ul>
  );
}

Board.propTypes = {
  boxes: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired
}

export default Board;
