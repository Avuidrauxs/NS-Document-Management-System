import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { deleteUser } from '../../actions/UserActions';
import GeneralSnackbar from '../snackbar/GeneralSnackbar';

class DeleteUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      snackbarMsg: ''
    };
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }
  onDeleteUser() {
    this.props.deleteUser(this.props.id)
    .then(() => {
      this.setState({
        openSnackbar: true,
        snackbarMsg: 'user deleted'
      });
      this.props.onCloseOpenDelete();
    });
  }
  render() {
    const actions = [
      <FlatButton
        key="1"
    label="Cancel"
    primary
    onTouchTap={() => this.props.onCloseOpenDelete()}
  />,
      <FlatButton
        key="2"
label="Delete"
primary
onTouchTap={this.onDeleteUser}
/>
    ];
    return (
      <div>
        <Dialog
      title="Delete user?"
      actions={actions}
      modal
      autoScrollBodyContent
      open={this.props.openDelete}
    >
          Are you sure you want to delete this user, this action is irreversible
        </Dialog>
        <GeneralSnackbar
          openSnackbar={this.state.openSnackbar}
          message={this.state.snackbarMsg}
          />
      </div>
    );
  }
}
DeleteUserModal.propTypes = {
  id: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
  openDelete: PropTypes.bool.isRequired,
  onCloseOpenDelete: PropTypes.func.isRequired
};

export default connect(null, { deleteUser })(DeleteUserModal);
