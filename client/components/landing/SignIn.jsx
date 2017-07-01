import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from 'muicss/lib/react/container';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import { postLogin, postSignUp } from '../../actions/AuthActions';
import GeneralSnackbar from '../snackbar/GeneralSnackbar';


class SignIn extends Component {

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
      openSnackbar: false,
      snackbarMsg: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.comparePassword = this.comparePassword.bind(this);
    this.alertWrongPassword = this.alertWrongPassword.bind(this);
  }

  onChange(event) {
    return this.setState({
      [event.target.name]: event.target.value,
      openSnackbar: false
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false, openSnackbar: false });
  }

  onSignUpSubmit(event) {
    event.preventDefault();
    this.props.postSignUp({
      username: this.state.signUpUsername,
      password: this.state.signUpPassword,
      fullName: this.state.fullName,
      email: this.state.email,
    })
    .then(() => {
      this.props.history.push('/dashboard');
    })
    .catch((err) => { throw new Error(err); });
  }

  onSignInSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.postLogin({ username, password }).then(() => {
      this.handleClose();
      this.props.history.push('/dashboard');
    })
    .catch((err) => { throw new Error(err); });
  }

  comparePassword() {
    if (this.state.signUpPassword !== this.state.confirmPassword) {
      this.alertWrongPassword();
    }
  }
  alertWrongPassword() {
    this.setState({
      signUpPassword: '',
      confirmPassword: '',
      openSnackbar: true,
      snackbarMsg: 'Password mismatch'
    });
  }

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
              style={{
                marginTop: '180px',
                textAlign: 'center' }}
                onSubmit={this.onSignInSubmit}
                >
              <Input
                label="username"
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

              <Button color="primary" variant="raised">SignIn</Button>

              <br />
              <br />
              <p>Not registered? Click <a
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
                <Form onSubmit={this.onSignUpSubmit}>
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

                  <Button color="primary" variant="raised">Sign Up</Button>
                </Form>
              </Container>
            </Dialog>
            <GeneralSnackbar
              openSnackbar={this.state.openSnackbar}
              message={this.state.snackbarMsg}
              />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignIn.propTypes = {
  postLogin: PropTypes.func.isRequired,
  postSignUp: PropTypes.func.isRequired,
  history: PropTypes.object
};


export default withRouter(connect(null, { postLogin, postSignUp })(SignIn));
