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
import jwt from 'jwt-decode';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import { fetchAllUsers } from '../../actions/UserActions';
import EditUserModal from '../modals/EditUserModal';
import DeleteUserModal from '../modals/DeleteUserModal';

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
      searchText: '',
      openEdit: false,
      openDelete: false,
      currentUserID: ''
    };
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.onCloseOpenEdit = this.onCloseOpenEdit.bind(this);
    this.onCloseOpenDelete = this.onCloseOpenDelete.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleOpenEdit(id) {
    this.setState({
      openEdit: true,
      currentUserID: id
    });
  }
  handleOpenDelete(id) {
    this.setState({
      openDelete: true,
      currentUserID: id
    });
  }
  onCloseOpenEdit() {
    this.setState({ openEdit: false });
  }
  onCloseOpenDelete() {
    this.setState({ openDelete: false });
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
    const decoded = jwt(localStorage.getItem('jwt-token'));
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
            {users.map((user, index) => {
              if (user.id !== decoded.id) {
                return (
                  <TableRow key={index}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{user.username}</TableRowColumn>
                    <TableRowColumn>{user.roleId}</TableRowColumn>
                    <TableRowColumn>
                      <IconButton
                          id={user.id}
                          tooltip="Edit User Role"
                          onTouchTap={() => this.handleOpenEdit(user.id)}>
                        <ActionEdit />
                      </IconButton>
                      <IconButton
                          key={user.id}
                          tooltip="Remove User"
                          onTouchTap={() => this.handleOpenDelete(user.id)}>
                        <ActionDelete />
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                );
              }
            }
            )}
          </TableBody>
        </Table>
        <EditUserModal
          id={this.state.currentUserID}
          openEdit={this.state.openEdit}
          onCloseOpenEdit={this.onCloseOpenEdit}
          />
        <DeleteUserModal
          id={this.state.currentUserID}
          openDelete={this.state.openDelete}
          onCloseOpenDelete={this.onCloseOpenDelete}
          />
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
