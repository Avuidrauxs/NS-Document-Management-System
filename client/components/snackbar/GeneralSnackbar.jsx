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
    // this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  // handleRequestClose() {
  //   this.setState({
  //     open: false,
  //   });
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props !== nextProps) {
  //     this.setState({ open: nextProps.openSnackbar });
  //   }
  // }

  render() {
    return (
      <Snackbar
          open={this.state.open}
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
