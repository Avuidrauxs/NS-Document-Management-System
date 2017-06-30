import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import DashboardDrawer from './DashboardDrawer';
import ProfilePic from '../../images/profile-placeholder.png';
import SignOutModal from '../modals/SignOutModal';


class DashboardAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      menuOpen: false,
      signOutOpen: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignoutClose = this.handleSignoutClose.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignoutClose() {
    this.setState({ signOutOpen: false });
  }
  handleSignOut() {
    this.setState({ signOutOpen: true });
  }
  handleToggle() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleRequestClose() {
    this.setState({
      menuOpen: false,
    });
  }
  handleTouchTap(event) {
  // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
  }
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
              <MenuItem primaryText="Edit Profile" />
              <MenuItem primaryText="Read API Doc" />
              <MenuItem primaryText="Sign out" onTouchTap={this.handleSignOut} />
            </Menu>
          </Popover>
        </div>
        <SignOutModal
          openSignOut={this.state.signOutOpen}
          closeSignOut={this.handleSignoutClose} />
      </div>
    }
    />
        <DashboardDrawer open={this.state.open} closeDrawer={this.handleClose} />
      </div>
    );
  }
}

export default DashboardAppBar;
