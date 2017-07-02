import React from 'react';
import { PropTypes } from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();


/**
 * Main Componet
 * this function returns a single React element ie. native DOM component
 * @param {object} props this constains parameters for ths component
 * @return {React.Component} [A react componet element]
 */
const Main = props => (
  <div>
    { props.children }
  </div>
);

Main.propTypes = {
  children: PropTypes.array.isRequired
};

Main.defaultProps = {
  children: [],
};

export default Main;
