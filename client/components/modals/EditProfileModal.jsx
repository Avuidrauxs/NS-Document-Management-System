import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { updateUser, getUserDetails } from '../../actions/UserActions';
import GeneralSnackbar from '../snackbar/GeneralSnackbar';

/**
 * EditProfileModal Component
 * @type {Object}
 */
class EditProfileModal extends Component {
  /**
   * EditProfileModal constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.decoded = jwt(localStorage.getItem('jwt-token'));
    this.state = {
      username: '',
      fullName: '',
      email: '',
      id: this.decoded.id,
      password: '',
      confirmPassword: '',
      isDisabled: true,
      openSnackbar: false,
      snackbarMsg: '',
      isChecked: false
    };
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.alertWrongPassword = this.alertWrongPassword.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onChecked = this.onChecked.bind(this);
  }

/**
 * handles the checkbox change
 * @return {null}       retruns nothing
 */
  handleChecked() {
    this.setState({
      isChecked: !this.state.isChecked
    });
    this.onChecked();
  }

/**
 * This function enables changing password when checked
 * @return {null}       retruns nothing
 */
  onChecked() {
    if (this.state.isChecked) {
      this.setState({
        isDisabled: true
      });
    } else {
      this.setState({
        isDisabled: false
      });
    }
  }
  /**
   * This function changes intial states based on onChange events
   * @param  {object} event [the events object parameter]
   *@return {null}       retruns nothing
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * This function is invoked immediately before mounting occurs.
   * @return {null}       returns nothing
   */
  componentWillMount() {
    this.props.getUserDetails(this.decoded.id).then(() => {
      this.setState({
        username: this.props.userProfile.username,
        fullName: this.props.userProfile.fullName,
        email: this.props.userProfile.email,
      });
    });
  }

  /**
   * this function dispatches an action to update a user role id
   * @return {null} returns nothing
   */
  onUpdateUser() {
    const { username, email, fullName, id, password } = this.state;
    if (password === '') {
      this.props.updateUser({
        username,
        fullName,
        email,
        id
      })
      .then(() => {
        this.setState({
          openSnackbar: true,
          snackbarMsg: 'profile updated'
        });
        this.props.onCloseOpenEdit();
      });
    } else {
      this.props.updateUser({
        username,
        fullName,
        email,
        password,
        id
      })
      .then(() => {
        this.setState({
          openSnackbar: true,
          snackbarMsg: 'profile updated'
        });
        this.props.onCloseOpenEdit();
      });
    }
  }

  /**
   * This function compares password and comparePassword test inputs
   * to verify they are the same
   * @return {null}       retruns nothing
   */
  comparePassword() {
    if (this.state.password !== this.state.confirmPassword) {
      this.alertWrongPassword();
    }
  }

    /**
     * This function pops up a snackbar to alert user of wrong password input
     * during signup
     * @return {null}       retruns nothing
     */
  alertWrongPassword() {
    this.setState({
      password: '',
      confirmPassword: '',
      openSnackbar: true,
      snackbarMsg: 'Password mismatch'
    });
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react component element]
   */
  render() {
    const { username, email, fullName, confirmPassword, password } = this.state;
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
    title="Update Profile information?"
    actions={actions}
    modal
    autoScrollBodyContent
    open={this.props.openEdit}
     >

          <TextField
            name="username"
            value={username}
            onChange={this.onChange}
            defaultValue={this.state.username}
            floatingLabelText="Username"
         />
          <TextField
           name="fullName"
           value={fullName}
           onChange={this.onChange}
           defaultValue={this.state.fullName}
           floatingLabelText="Full Name"
        />
          <TextField
          name="email"
          type="email"
          value={email}
          onChange={this.onChange}
          defaultValue={this.state.email}
          floatingLabelText="E-mail"
       />
          <Checkbox
       label="Change Password?"
       checked={this.state.isChecked}
       onCheck={this.handleChecked}
       style={{ marginTop: '20px' }}
     />
          <TextField
         name="password"
         type="password"
         value={password}
         disabled={this.state.isDisabled}
         onChange={this.onChange}
         floatingLabelText="Password"
      />
          <br />
          <TextField
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        disabled={this.state.isDisabled}
        onChange={this.onChange}
        defaultValue={this.state.confirmPassword}
        floatingLabelText="Confirm Password"
        onBlur={this.comparePassword}
     />
        </Dialog>
        <GeneralSnackbar
    openSnackbar={this.state.openSnackbar}
    message={this.state.snackbarMsg}
    />
      </div>
    );
  }

}
EditProfileModal.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
  openEdit: PropTypes.bool.isRequired,
  onCloseOpenEdit: PropTypes.func.isRequired
};

EditProfileModal.defaultProps = {
  userProfile: {}
};

export default connect(state => ({
  userProfile: state.UserReducer.profile
}), { getUserDetails, updateUser })(EditProfileModal);
