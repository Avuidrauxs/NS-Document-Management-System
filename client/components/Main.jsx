import React from 'react';
import { PropTypes } from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();


// <Header> and <Footer>
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
