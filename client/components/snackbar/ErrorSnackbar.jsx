import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

/**
 * ErrorSnackbar Component
 * @type {Object}
 */
export default class ErrorSnackbar extends Component {

  /**
   * ErrorSnackbar constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.openErrorSnackbar,
    };
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    return (
      <Snackbar
          open={this.props.openErrorSnackbar}
          message={this.props.errorMessage}
          autoHideDuration={4000}
        />
    );
  }
}

ErrorSnackbar.propTypes = {
  openErrorSnackbar: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};

ErrorSnackbar.defaultProps = {
  openErrorSnackbar: false,
};
