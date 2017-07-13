import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import swal from 'sweetalert2';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import DashboardDrawer from './DashboardDrawer';
import ProfilePic from '../../images/profile-placeholder.png';
import { logout } from '../../actions/AuthActions';
import EditProfileModal from '../modals/EditProfileModal';

/**
 * DashboardAppBar React Componet
 * @type {Object}
 */
export class DashboardAppBar extends Component {

  /**
   * DashboardAppBar constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      menuOpen: false,
      signOutOpen: false,
      openEdit: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.onCloseOpenEdit = this.onCloseOpenEdit.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }
  /**
   * This function disptaches an action to log a user out of NSDMS
   * @return {null}       retruns nothing
   */
  onSignOut() {
    swal({
      title: 'You wanna leave?',
      text: 'Stay for a while maybe?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#CCDBDC',
      cancelButtonColor: '#3085d6',
      cancelButtonText: "I'm staying",
      confirmButtonText: 'Bye bye'
    }).then(() => {
      this.props.logout();
      this.props.history.push('/');
    });
  }

  /**
   * This function handles toggling the drawer
   * @return {null} returns nothing
   */
  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  /**
   * this function handles closing the drawer when
   * mouse is clicked away from the drawer
   * @return {null} returns nothing
   */
  handleClose() {
    this.setState({ open: false });
  }

  /**
   * This function handles closing the popover menu on the Avatar
   * on mouse click outside the componst
   * @return {null} returns nothing
   */
  handleRequestClose() {
    this.setState({
      menuOpen: false,
    });
  }
  /**
   * This function handles the opening of the popover menu on the avatar
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  handleTouchTap(event) {
  // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
  }

  /**
   * This function opens the edit profile modal
   * @return {null}       returns nothing
   */
  handleOpenEdit() {
    this.setState({
      openEdit: true
    });
  }

  /**
   * This function closes the edit profile modal
   * @return {null}       returns nothing
   */
  onCloseOpenEdit() {
    this.setState({ openEdit: false });
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const sectionStyle = {
      position: 'absolute',
      left: '-10px',
      right: '-15px'
    };
    return (
      <div>
        <AppBar
      style={sectionStyle}
    title="NSDMS"

    onLeftIconButtonTouchTap={this.handleToggle}
    iconElementRight={
      <div>
        <Avatar
          src={ProfilePic}
          onMouseEnter={this.handleTouchTap}
           />
        <div
onMouseLeave={this.handleRequestClose}
              onMouseOut={this.handleRequestClose}>
          <Popover
     open={this.state.menuOpen}
     anchorEl={this.state.anchorEl}
     anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
     targetOrigin={{ horizontal: 'left', vertical: 'top' }}
     onRequestClose={this.handleRequestClose}
     autoCloseWhenOffScreen
     animation={PopoverAnimationVertical}
    >
            <Menu>
              <MenuItem
                primaryText="Edit Profile"
                onTouchTap={this.handleOpenEdit} />
              <Link to="/api"><MenuItem
                primaryText="Read API Doc" /></Link>
              <MenuItem
                primaryText="Sign out"
                onTouchTap={this.onSignOut} />
            </Menu>
          </Popover>
        </div>
        <EditProfileModal
          openEdit={this.state.openEdit}
          onCloseOpenEdit={this.onCloseOpenEdit}
          />
      </div>
    }
    />
        <DashboardDrawer
          open={this.state.open}
          closeDrawer={this.handleClose} />
      </div>
    );
  }
}
DashboardAppBar.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(connect(null, { logout })(DashboardAppBar));
