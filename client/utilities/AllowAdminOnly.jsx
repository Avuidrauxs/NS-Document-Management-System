import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import toast from 'toastr';


export default (ComposedComponent) => {
  /**
   * AllowAdminOnly Component
   * @type {Object}
   */
  class AllowAdminOnly extends Component {

    /**
     * This function is invoked immediately before mounting occurs.
     * @return {null}       returns nothing
     */
    componentWillMount() {
      if (!this.props.isAuthenticated
        || this.props.user.id !== 1) {
        this.props.history.push('/dashboard');
        toast.warning('Nice Try but you dont have that privilege', 'Alert...!');
        return (
          <Redirect
            to={{
              pathname: '/dashboard',
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
      if (!this.props.isAuthenticated || !nextProps.isAuthenticated
        || this.props.user.id !== 1) {
        this.props.history.push('/dashboard');
        toast.warning('Nice Try but you dont have that privilege', 'Alert...!');
        return (
          <Redirect
            to={{
              pathname: '/dashboard',
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

  AllowAdminOnly.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  AllowAdminOnly.defaultProps = {
    isAuthenticated: false,
  };


  return withRouter(connect(state => ({
    isAuthenticated: state.AuthReducer.loggedIn,
    user: state.AuthReducer.user,
  }), null)(AllowAdminOnly));
};
