import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { logout } from '../../actions/AuthActions';

class SignOutModal extends Component {
  constructor(props) {
    super(props);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onSignOut() {
    this.props.logout()
    .then(() => {
      this.props.history.push('/');
    });
  }
  render() {
    const actions = [
      <FlatButton
        key="1"
    label="Stay A While Longer"
    primary
    onTouchTap={() => this.props.closeSignOut()}
  />,
      <FlatButton
        key="2"
label="Sign Out!"
primary
onTouchTap={this.onSignOut}
/>];
    return (
      <Dialog
                      actions={actions}
                      modal
                      autoScrollBodyContent
                      open={this.props.openSignOut}
                     >
                     Are you sure you wanna leave?
                     </Dialog>
    );
  }
}
SignOutModal.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.object,
  openSignOut: PropTypes.bool.isRequired,
  closeSignOut: PropTypes.func.isRequired
};

SignOutModal.defaultProps = {
  openSignOut: false
};

export default withRouter(connect(null, { logout })(SignOutModal));
