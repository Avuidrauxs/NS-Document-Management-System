import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Pagination from 'material-ui-pagination';
import { fetchUserDocuments } from '../../actions/DocumentActions';
import DocumentCard from '../document-editor/DocumentCard';

/**
 * UserDocumentsList component
 * @type {Object}
 */
export class UserDocumentsList extends Component {

  /**
   * UserDocumentsList constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      pageNumbers: [],
      notFound: 'none',
      currentPage: 1,
      itemsPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
  }

  /**
   * This function is invoked before a mounted component receives new props
   * @param  {object} nextProps new prop object after new changes
   * @return {null}           returns nothing
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.documents.length === 0) {
      this.setState({
        notFound: ''
      });
    } else {
      this.setState({
        notFound: 'none'
      });
    }
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
   * This function handles changing the state of the textfields onChange event
   * @param  {object} event [object parameter]
   * @return {null}       returns nothing
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * This function filters through the documents list
   * @param  {array} documents [array of document objects]
   * @param {string} searchText string paramter from search textfield
   * @return {array}           [array of filtered document objects]
   */
  filteredSearch(documents, searchText) {
    let filteredSearch = documents;
    filteredSearch = filteredSearch.filter((source) => {
      const text = source.title.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });
    return filteredSearch;
  }

  /**
   * This function is invoked immediately before mounting occurs.
   * @return {null}       returns nothing
   */
  componentWillMount() {
    // disptching action to fetch documents here
    this.props.fetchUserDocuments(this.props.user.id);
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const { currentPage, itemsPerPage } = this.state;
    const documents = this.filteredSearch(
      this.props.documents,
      this.state.searchText);
    // Logic for pagination
    const indexOfLastDocument = currentPage * itemsPerPage;
    const indexofFirstDocument = indexOfLastDocument - itemsPerPage;
    const pagiDocuments = documents
    .slice(indexofFirstDocument, indexOfLastDocument);

    // Logic for displaying page numbers
    const { pageNumbers } = this.state;
    for (let i = 1; i <= Math.ceil(documents.length / itemsPerPage); i += 1) {
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
        <h1
          style={{ textTransform: 'capitalize' }}>
          {`${this.props.user.username}'s`} Documents
        </h1>
        <TextField
          className="search-field"
          hintText="Search Documents"
          fullWidth
          name="searchText"
          onChange={this.onChange}
          value={this.state.searchText}
          style={{
            textAlign: 'center'
          }}
        />
        <div style={{ marginLeft: '500px', display: 'none' }}>
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
        <Pagination
          className="pagination-component"
  total={this.state.itemsPerPage}
  current={this.state.currentPage}
  display={this.state.currentPage}
  onChange={this.handleClick}
   />
        <Container className="main-container" fluid>
          <Row>
            <div
style={{
  marginTop: '9em',
  color: 'rgba(8, 8, 8, 0.19)',
  display: `${this.state.notFound}`
}}><h1>NO DOCUMENTS AVAILABLE</h1></div>
            {pagiDocuments.map((document, index) => {
              return (
                <Col xs="6" md="4" key={index}>
                  <DocumentCard document={document} />
                </Col>
              );
            })}

          </Row>
        </Container>
      </div>

    );
  }
}

UserDocumentsList.propTypes = {
  fetchUserDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer,
  user: state.AuthReducer.user
}), { fetchUserDocuments })(UserDocumentsList);
