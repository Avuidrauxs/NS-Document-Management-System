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
import IconRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { fetchAllUsers, searchUsers, deleteUser } from '../../actions/UserActions';
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
      currentPage: props.pagination.pageCount,
      pageNumbers: [],
      itemsPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.handleOpenDelete = this.handleOpenDelete.bind(this);
    this.onCloseOpenEdit = this.onCloseOpenEdit.bind(this);
    this.onCloseOpenDelete = this.onCloseOpenDelete.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  /**
   * This function dispatches the action to delte a user
   * @param  {number} id [that is the user selected id parameter]
   * @return {null}       retruns nothing
   */
  onDeleteUser(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      this.props.deleteUser(id).then(() => {
        swal(
      'Deleted!',
      'User has been deleted.',
      'success'
    );
      }).catch((err) => { throw new Error(err); });
    });
  }

  /**
   * This function handles the click events of the pagination numbers
   * @param  {object} event [event object paramter]
   * @return {null}       returns nothing
   */
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  /**
   * This handles resetting the pagination to the first page
   * @return {null}       returns nothing
   */
  handleFirstClick() {
    this.setState({
      currentPage: 1
    });
  }

  /**
   * This function handles going to the last pagination page
   * @return {null}       returns nothing
   */
  handleLastClick() {
    this.setState({
      currentPage: this.state.pageNumbers.length
    });
  }

  /**
   * This function is invoked immediately before mounting occurs.
   * @return {null}       returns nothing
   */
  componentWillMount() {
    this.props.fetchAllUsers();
  }

/**
 * This function dispatches action to search for a user based on theri username
 * @return {null}       returns nothing
 */
  onClickSearch() {
    this.props.searchUsers(this.state.searchText);
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
   * This function opens the delete user modal
   * @param  {number} id [that is the user selected id parameter]
   * @return {null}       returns nothing
   */
  handleOpenDelete(id) {
    this.setState({
      openDelete: true,
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
   * This function closes the delete user modal
   * @return {null}       returns nothing
   */
  onCloseOpenDelete() {
    this.setState({ openDelete: false });
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
   * This function filters through the users list
   * @param  {array} users [array of user objects]
   * @param {string} searchText string paramter from search textfield
   * @return {array}           [array of filtered user objects]
   */
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

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const { currentPage, itemsPerPage } = this.state;

    // Logic for pagination
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexofFirstUser = indexOfLastUser - itemsPerPage;
    const paginatedUsers = this.props.users.slice(indexofFirstUser, indexOfLastUser);

    // Logic for displaying page numbers
    const { pageNumbers } = this.state;
    for (let i = 1; i <= Math.ceil(this.props.users.length / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
             key={number}
             id={number}
             onClick={this.handleClick}
             style={{ marginTop: '12px' }}
           >
          {number}
        </li>
      );
    });
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
        <div style={{ marginLeft: '500px' }}>
          <ul className="page-numbers">
            <li><IconButton
              onTouchTap={this.handleFirstClick}
              tooltip="Go to First">
              <IconLeft />
            </IconButton>
            </li>
            {renderPageNumbers}
            <li><IconButton
              onTouchTap={this.handleLastClick}
              tooltip="Go to Last">
              <IconRight />
            </IconButton>
            </li>
          </ul>
        </div>
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
            {paginatedUsers.map((user, index) => {
              if (user.id !== this.props.user.id) {
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
                          onTouchTap={() => this.onDeleteUser(user.id)}>
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
