import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import { fetchAllUsers } from '../../actions/UserActions';

class UsersTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
      searchText: ''
    };
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchAllUsers();
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  handleChange(event) {
    this.setState({ height: event.target.value });
  }

  filteredSearch(users, searchText) {
    let filteredSearch = users;
    if (searchText === '') {
      return filteredSearch;
    }
    filteredSearch = filteredSearch.filter((source) => {
      const text = source.username.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });
    return filteredSearch;
  }
  render() {
    const users = this.filteredSearch(
      this.props.users,
      this.state.searchText
    );
    return (
      <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>

          <TextField
        hintText="Search Users"
        fullWidth
        name="searchText"
        onChange={this.onChange}
        value={this.state.searchText}
        style={{
          textAlign: 'center'
        }}
      />
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Number">No.</TableHeaderColumn>
              <TableHeaderColumn tooltip="Username">Username</TableHeaderColumn>
              <TableHeaderColumn tooltip="Role ID">Role ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{user.username}</TableRowColumn>
                <TableRowColumn>{user.roleId}</TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    id={user.id}
                    tooltip="Edit User Role"
                    onTouchTap="#">
                    <ActionEdit />
                  </IconButton>
                  <IconButton
                    key={user.id}
                    tooltip="Remove User"
                    onTouchTap="#">
                    <ActionDelete />
                  </IconButton>
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>No.</TableRowColumn>
              <TableRowColumn>Username</TableRowColumn>
              <TableRowColumn>Role ID</TableRowColumn>
              <TableHeaderColumn tooltip="Actions">Actions</TableHeaderColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

UsersTable.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default connect(state => ({
  users: state.UserReducer.users
}), { fetchAllUsers })(UsersTable);
