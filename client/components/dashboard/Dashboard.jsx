import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Container from 'muicss/lib/react/container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionList from 'material-ui/svg-icons/action/list';
import ContentSave from 'material-ui/svg-icons/content/save';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import ContentFilterList from 'material-ui/svg-icons/content/filter-list';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import UsersTable from './UsersTable';
import ProfilePic from '../../images/profile-placeholder.png';
import DocumentsList from './DocumentList';
import routes from './routes';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      open: false,
      menuOpen: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
  // This prevents ghost click.
    event.preventDefault();

    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
    });
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

  render() {
    const sectionStyle = {
      position: 'absolute',
      left: '-10px',
      right: '-15px'
    };
    return (
      <Router>
        <MuiThemeProvider>
          <div>
            <AppBar
            style={sectionStyle}
        title="NSDMS"

        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={
          <div>
            <Avatar src={ProfilePic} onTouchTap={this.handleTouchTap} />
            <Popover
           open={this.state.menuOpen}
           anchorEl={this.state.anchorEl}
           anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
           targetOrigin={{ horizontal: 'left', vertical: 'top' }}
           onRequestClose={this.handleRequestClose}
           animation={PopoverAnimationVertical}
         >
              <Menu>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help &amp; feedback" />
                <MenuItem primaryText="Settings" />
                <MenuItem primaryText="Sign out" />
              </Menu>
            </Popover>
          </div>
        }
      />

            <Drawer
       docked={false}
       width={300}
       open={this.state.open}
       onRequestChange={open => this.setState({ open })}
     >
              <List>
                <Subheader>Welcome, Audax</Subheader>
                <ListItem
                primaryText="Save a New Document"
                leftIcon={<ActionChromeReaderMode />} />
                <Link to="/dash-documents"><ListItem
                primaryText="View Documents"
                leftIcon={<ContentFilterList />}
                /></Link>
                <ListItem
                primaryText="Drafts"
                leftIcon={<ContentDrafts />}
                />
                <ListItem
                  style={
                    {
                      display: ''
                    }
                  }
                primaryText="Admin Actions"
                leftIcon={<ContentInbox />}
                primaryTogglesNestedList
                nestedItems={[
                  <Link key={1} to="/dash-users"><ListItem
                    key={1}
                    primaryText="View All Users"
                    leftIcon={<ActionList />}
                  /></Link>,
                  <Link key={2} to="/admin-documents"><ListItem
                    key={2}
                    primaryText="View All Documents"
                    leftIcon={<ContentFilterList />}
                  /></Link>,
                ]}
              />
              </List>
            </Drawer>
            <Container>
              {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
                <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
            </Container>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default Dashboard;
