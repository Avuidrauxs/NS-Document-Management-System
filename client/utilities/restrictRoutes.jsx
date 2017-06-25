import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default (ComposedComponent) => {

  class RestrictRoute extends Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
        console.log('Wrong Credentials');
        return (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        );
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.props.isAuthenticated || !nextProps.isAuthenticated) {
        this.props.history.push('/');
        console.log('You must be signed in');
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: this.props.location }
            }}
          />
        );
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} {...this.state} />
      );
    }
  }

  RestrictRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  RestrictRoute.defaultProps = {
    isAuthenticated: false,
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.AuthReducer.loggedIn,
  });

  return withRouter(connect(mapStateToProps)(RestrictRoute));
};