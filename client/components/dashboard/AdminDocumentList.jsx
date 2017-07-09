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
import { fetchDocuments, searchDocuments } from '../../actions/DocumentActions';
import DocumentCard from '../document-editor/DocumentCard';

/**
 * Admins Document List Component
 * @type {Object}
 */
export class AdminDocumentsList extends Component {

/**
 * AdminDocumentsList constuctor, here is where all states are initiated
 * @param  {object} props [contains props parameters passed into Component]
 * @return {null}       retruns nothing
 */
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      paginate: Object.assign({}, props.pagination),
      pageNumbers: [],
      currentPage: 1,
      itemsPerPage: 9
    };
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
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
   * This function handles search for a document
   * @return {null}       returns nothing
   */
  onClickSearch() {
    this.props.searchDocuments(this.state.searchText);
  }

/**
 * this function is invoked immediately after a component is mounted
 * @return {null}       returns nothing
 */
  componentDidMount() {
    // disptching action to fetch documents here
    this.props.fetchDocuments();
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const { currentPage, itemsPerPage } = this.state;
    // Logic for pagination
    const indexOfLastDocument = currentPage * itemsPerPage;
    const indexofFirstDocument = indexOfLastDocument - itemsPerPage;
    const paginateDocuments = this.props.documents.slice(indexofFirstDocument, indexOfLastDocument);

    // Logic for displaying page numbers
    const { pageNumbers } = this.state;
    for (let i = 1; i <= Math.ceil(this.props.documents.length / itemsPerPage); i += 1) {
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
        <h1>All Documents</h1>
        <TextField
        hintText="Search Documents by Title"
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
        <Container fluid>
          <Row>
            {paginateDocuments.map((document, index) => {
              return (
                <Col xs="6" md="4" key={index}>
                  <DocumentCard document={document} ReadOnly />
                </Col>
              );
            })}

          </Row>
        </Container>

      </div>

    );
  }
}

AdminDocumentsList.propTypes = {
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer,
  pagination: state.PaginationReducer
}), { fetchDocuments, searchDocuments })(AdminDocumentsList);
