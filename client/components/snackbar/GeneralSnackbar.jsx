import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

/**
 * GeneralSnackbar Component
 * @type {Object}
 */
export default class GeneralSnackbar extends Component {

  /**
   * GeneralSnackbar constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.openSnackbar,
    };
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    return (
      <Snackbar
          open={this.props.openSnackbar}
          message={this.props.message}
          autoHideDuration={4000}
        />
    );
  }
}

GeneralSnackbar.propTypes = {
  openSnackbar: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

GeneralSnackbar.defaultProps = {
  openSnackbar: false,
};
