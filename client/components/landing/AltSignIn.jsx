import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import TextField from 'material-ui/TextField';
import Button from 'muicss/lib/react/button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';
import { postLogin } from '../../actions/AuthActions';
import { isUserName } from '../../utilities/validator';

export class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: '',
      password: '',
      confirmPassword: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    // this.onSignOutSubmit = this.SignOutSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.comparePassword = this.comparePassword.this(this);
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  onSignOutSubmit(event) {
    event.preventDefault();
  }

  onSignInSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;


      this.props.postLogin({ username, password }).then((res) => {
          console.log('am here ', res);
          Materialize.toast('Welcome', 3000);
          this.props.history.push('/dashboard');
      },
    (err) => {
      Materialize.toast(err, 3000);
    }
  );
  }

  comparePassword() {

  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <MuiThemeProvider>
        <div>
          <div className="sign-in">
            <div className="divider" />
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
              <Form>
                <Input label="First name" floatingLabel required errorText="Feild required" />
                <Input label="Last name" floatingLabel />
                <Input label="Username" floatingLabel required />
                <Input label="Email" type="password" floatingLabel required />
                <Input label="Password" type="password" floatingLabel required />
                <Input
                    label="Re-type Password"
                    type="password"
                    floatingLabel
                    required
                  />
              </Form>

            </Dialog>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignIn.propTypes = {
  postLogin: PropTypes.func.isRequired,
  history: PropTypes.object
};


export default withRouter(connect(null, { postLogin })(SignIn));
