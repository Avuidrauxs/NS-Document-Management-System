import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toast from 'toastr';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from 'muicss/lib/react/container';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import { postLogin, postSignUp } from '../../actions/AuthActions';


/**
 * SignIn Component
 * @type {Object}
 */
export class SignIn extends Component {

  /**
   * SignIn constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: '',
      signUpUsername: '',
      signUpPassword: '',
      email: '',
      fullName: '',
      confirmPassword: '',
      isError: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.alertWrongPassword = this.alertWrongPassword.bind(this);
  }

  /**
   * This function changes intial states based on onChange events
   * @param  {object} event [the events object parameter]
   * @return {null}       retruns nothing
   */
  onChange(event) {
    return this.setState({
      [event.target.name]: event.target.value,
    });
  }

/**
 * This function opens the SignUp Modal
 * @return {null}       retruns nothing
 */
  handleOpen() {
    this.setState({ open: true });
  }

  /**
   * This function closes the SignUp Modal
   * @return {null}       retruns nothing
   */
  handleClose() {
    this.setState({ open: false });
  }


/**
 * This dispatches the action to create a new user onClick on the signup button
 * @param  {object} event [this is the event object parameter]
 *  @return {null}       retruns nothing
 */
  onSignUpSubmit(event) {
    event.preventDefault();
    if (this.state.signUpPassword.length >= 8) {
      this.props.postSignUp({
        username: this.state.signUpUsername,
        password: this.state.signUpPassword,
        fullName: this.state.fullName,
        email: this.state.email,
      })
    .then(() => {
      if (this.props.error) {
        toast.error('Username or email is taken',
        'Unaccepatable...!');
      } else {
        this.props.history.push('/dashboard');
      }
    });
    } else {
      toast.error('Password should be at least 8 characters',
      'Unaccepatable...!');
    }
  }

  /**
   * This dispatches the action to allow a user to login onClick
   * on the signin button
   * @param  {object} event [this is the event object parameter]
   *  @return {null}       retruns nothing
   */
  onSignInSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.postLogin({ username, password }).then(() => {
      this.handleClose();
      this.props.history.push('/dashboard');
    })
    .catch((err) => {
      throw new Error(err);
    });
  }

/**
 * This function compares password and comparePassword test inputs
 * to verify they are the same
 * @return {null}       retruns nothing
 */
  comparePassword() {
    if (this.state.signUpPassword !== this.state.confirmPassword) {
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
      signUpPassword: '',
      confirmPassword: '',
    });
    toast.error('Password mismatch', 'Oopps...!');
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const actions = [
      <FlatButton
        key="1"
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <MuiThemeProvider>
        <div>
          <div className="sign-in">
            <Form
              name="signInForm"
              style={{
                marginTop: '180px',
                textAlign: 'center' }}
                onSubmit={this.onSignInSubmit}
                >
              <Input
                label="username"
                id="username"
                floatingLabel
                required
                name="username"
                onChange={this.onChange}
                />
              <Input
                label="password"
                type="password"
                floatingLabel
                required
                name="password"
                onChange={this.onChange}
                />

              <Button
                type="submit"
                color="primary"
                variant="raised"
                className="signin-button">SignIn</Button>

              <br />
              <br />
              <p>Not registered? Click <a
                id="signup"
                onTouchTap={this.handleOpen}
                style={{ cursor: 'pointer', color: 'black' }}
                        ><em>here
            </em></a> to register</p>
            </Form>
          </div>
          <div>
            <Dialog

            title="Sign Up"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
              <Container>
                <Form name="signUpForm" onSubmit={this.onSignUpSubmit}>
                  <Input
                    label="Full name"
                    floatingLabel
                    required
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                    />
                  <Input
                    label="Username"
                    floatingLabel
                    required
                    name="signUpUsername"
                    value={this.state.signUpUsername}
                    onChange={this.onChange}
                    />
                  <Input
                    label="Email"
                    type="email"
                    floatingLabel
                    required
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    />
                  <Input
                  label="Password"
                  type="password"
                  floatingLabel
                  required
                  name="signUpPassword"
                  value={this.state.signUpPassword}
                  onChange={this.onChange}
                  />
                  <Input
                    label="Re-type Password"
                    type="password"
                    floatingLabel
                    required
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                    onBlur={this.comparePassword}
                  />

                  <Button
                  type="submit"
                  color="primary"
                  className="signup-button"
                  variant="raised">Sign Up</Button>
                </Form>
              </Container>
            </Dialog>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignIn.propTypes = {
  postLogin: PropTypes.func.isRequired,
  postSignUp: PropTypes.func.isRequired,
  error: PropTypes.object,
  history: PropTypes.object
};


export default withRouter(connect(state => ({
  error: state.AuthReducer.message
}), { postLogin, postSignUp })(SignIn));
