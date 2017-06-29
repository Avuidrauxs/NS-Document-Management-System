import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';


export default class GeneralSnackbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.openSnackbar,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

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
