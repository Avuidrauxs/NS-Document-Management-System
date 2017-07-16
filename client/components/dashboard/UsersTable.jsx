import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import swal from 'sweetalert2';
import TextField from 'material-ui/TextField';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import Pagination from 'material-ui-pagination';
import { fetchAllUsers,
  searchUsers,
  deleteUser } from '../../actions/UserActions';
import EditUserModal from '../modals/EditUserModal';

/**
 * UsersTable component
 * @type {Object}
 */
export class UsersTable extends Component {

  /**
   * UsersTable constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
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
      currentUserID: '',
      itemsPerPage: 9
    };
    this.onChange = this.onChange.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.onCloseOpenEdit = this.onCloseOpenEdit.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
    this.handleRoles = this.handleRoles.bind(this);
    this.getMoreUsers = this.getMoreUsers.bind(this);
  }

  /**
  * [getMoreDocuments description]
  * @param  {number} offset [description]
  * @return {[type]}        [description]
  */
  getMoreUsers(offset) {
    return this.props.fetchAllUsers(offset, this.state.itemsPerPage);
  }

  /**
   * This function dispatches the action to delte a user
   * @param  {object} user [that is the user selected id parameter]
   * @return {null}       retruns nothing
   */
  onDeleteUser(user) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes delete ${user.username}`
    }).then(() => {
      this.props.deleteUser(user).then(() => {
        swal(
      'Deleted!',
      `${user.username} deleted successfully`,
      'success'
    );
      }).catch((err) => { throw new Error(err); });
    });
  }

  /**
   * This function is invoked immediately before mounting occurs.
   * @return {null}       returns nothing
   */
  componentWillMount() {
    this.props.fetchAllUsers(this.props.pagination.offset,
      this.state.itemsPerPage);
  }

/**
 * This function dispatches action to search for a user based on theri username
 * @return {null}       returns nothing
 */
  onClickSearch() {
    this.props.searchUsers(this.state.searchText,
      this.props.pagination.offset, this.state.itemsPerPage);
  }

  /**
   * This function opens the edit user modal
   * @param  {number} id [that is the user selected id parameter]
   * @return {null}       returns nothing
   */
  handleOpenEdit(id) {
    this.setState({
      openEdit: true,
      currentUserID: id
    });
  }

  /**
   * This function closes the edit user modal
   * @return {null}       returns nothing
   */
  onCloseOpenEdit() {
    this.setState({ openEdit: false });
  }

  /**
   * This function changes intial states based on onChange events
   * @param  {object} event [the events object parameter]
   * @return {[type]}       [description]
   */
  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * This handles the intial state of height when it changes
   * @param  {object} event [the events object parameter]
   * @return {[type]}       [description]
   */
  handleChange(event) {
    this.setState({ height: event.target.value });
  }

/**
 * This function handles displaying actual role names
 * @param  {number} id [role id]
 * @return {string}    returns string of role description
 */
  handleRoles(id) {
    switch (Number(id)) {
    case 1:
      return 'admin';
    case 2:
      return 'user';
    default:
      return 'role';
    }
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const { users } = this.props;
    return (
      <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>

        <TextField
        hintText="Search Users by Username"
        fullWidth
        name="searchText"
        onChange={this.onChange}
        onKeyUp={this.onClickSearch}
        value={this.state.searchText}
        style={{
          textAlign: 'center'
        }}
      />
        <Pagination
          className="pagination-component"
  total={this.props.pagination.pageCount}
  current={this.props.pagination.page}
  display={this.props.pagination.pageCount}
  onChange={number => this.getMoreUsers((number - 1) * 9)}
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
              if (user.id !== this.props.user.id) {
                return (
                  <TableRow key={index}>
                    <TableRowColumn>{index}</TableRowColumn>
                    <TableRowColumn>{user.username}</TableRowColumn>
                    <TableRowColumn>{this.handleRoles(user.roleId)}
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton
                        className="editRole"
                          id={user.id}
                          tooltip="Edit User Role"
                          onTouchTap={() => this.handleOpenEdit(user.id)}>
                        <ActionEdit />
                      </IconButton>
                      <IconButton
                        className="deleteUser"
                          key={user.id}
                          tooltip="Remove User"
                          onTouchTap={() => this.onDeleteUser(user)}>
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
          id={Number(this.state.currentUserID)}
          openEdit={this.state.openEdit}
          onCloseOpenEdit={this.onCloseOpenEdit}
          />
      </div>
    );
  }
}

UsersTable.propTypes = {
  fetchAllUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
};

export default connect(state => ({
  users: state.UserReducer.users,
  user: state.AuthReducer.user,
  pagination: state.PaginationReducer
}), { fetchAllUsers, searchUsers, deleteUser })(UsersTable);
