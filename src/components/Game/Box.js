import React from 'react';
import PropTypes from 'prop-types';


const Box = props => <li className={`box ${props.contents}`}
                         onClick={ props.move } >
                     </li>

Box.propTypes = {
  move: PropTypes.func.isRequired,
  contents: PropTypes.string
}

export default Box;
