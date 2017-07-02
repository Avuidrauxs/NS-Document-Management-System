import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { updateUser } from '../../actions/UserActions';
import GeneralSnackbar from '../snackbar/GeneralSnackbar';

/**
 * EditUserModal Component
 * @type {Object}
 */
class EditUserModal extends Component {

  /**
   * EditUserModal constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      roleId: null,
      openSnackbar: false,
      snackbarMsg: ''
    };
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * This function changes intial states based on onChange events
   * @param  {object} event [the events object parameter]
   *@return {null}       retruns nothing
   */
  onChange(event) {
    this.setState({ roleId: event.target.value });
  }

  /**
   * this function dispatches an action to update a user role id
   * @return {[type]} [description]
   */
  onUpdateUser() {
    this.props.updateUser({
      roleId: !Number(this.state.roleId) ? 2 : Number(this.state.roleId),
      id: this.props.id
    })
    .then(() => {
      this.setState({
        openSnackbar: true,
        snackbarMsg: 'user updated'
      });
      this.props.onCloseOpenEdit();
    });
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react component element]
   */
  render() {
    const actions = [
      <FlatButton
        key="1"
    label="Cancel"
    primary
    onTouchTap={() => this.props.onCloseOpenEdit()}
  />,
      <FlatButton
        key="2"
label="Update"
primary
onTouchTap={this.onUpdateUser}
/>
    ];
    return (
      <div>
        <Dialog
      title="Update user information?"
      actions={actions}
      modal
      autoScrollBodyContent
      open={this.props.openEdit}
    >
          <RadioButtonGroup name="shipSpeed" defaultSelected="2">
            <RadioButton
        value="1"
        name="roleId"
        label="Admin"
        onClick={this.onChange}
      />
            <RadioButton
        value="2"
        name="roleId"
        label="User"
        onClick={this.onChange}
      />
          </RadioButtonGroup>
        </Dialog>
        <GeneralSnackbar
          openSnackbar={this.state.openSnackbar}
          message={this.state.snackbarMsg}
          />
      </div>
    );
  }
}
EditUserModal.propTypes = {
  id: PropTypes.any.isRequired,
  updateUser: PropTypes.func.isRequired,
  openEdit: PropTypes.bool.isRequired,
  onCloseOpenEdit: PropTypes.func.isRequired
};

export default connect(null, { updateUser })(EditUserModal);
