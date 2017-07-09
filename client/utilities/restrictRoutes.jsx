import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'toastr';


export default (ComposedComponent) => {
  /**
   * RestrictRoute Component
   * @type {Object}
   */
  class RestrictRoute extends Component {

    /**
     * This function is invoked immediately before mounting occurs.
     * @return {null}       returns nothing
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
        toast.error('Invalid username or password', 'Oopps...!');
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

/**
 * this function is invoked immediately before rendering
 * when new props or state are being received.
 * @param  {object} nextProps [contains parameters of new props]
 * @return {null}       returns nothing
 */
    componentWillUpdate(nextProps) {
      if (!this.props.isAuthenticated || !nextProps.isAuthenticated) {
        this.props.history.push('/');
        toast.info('You need to be signed in to proceed', 'Alert!');
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

      /**
       * this function returns a single React element ie. native DOM component
       * @return {React.Component} [A react componet element]
       */
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


  return withRouter(connect(state => ({
    isAuthenticated: state.AuthReducer.loggedIn,
  }), null)(RestrictRoute));
};
