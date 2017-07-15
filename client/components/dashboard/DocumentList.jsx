import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import Pagination from 'material-ui-pagination';
import DocumentCard from '../document-editor/DocumentCard';
import { fetchDocuments, searchDocuments } from '../../actions/DocumentActions';

/**
 * DocumentsList component
 * @type {Object}
 */
export class DocumentsList extends Component {

  /**
   * DocumentsList constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      notFound: 'none',
      itemsPerPage: 9
    };
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.getMoreDocuments = this.getMoreDocuments.bind(this);
  }

/**
 * [getMoreDocuments description]
 * @param  {number} offset [description]
 * @return {[type]}        [description]
 */
  getMoreDocuments(offset) {
    return this.props.fetchDocuments(offset, this.state.itemsPerPage);
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
    this.props
    .searchDocuments(this.state.searchText,
      this.props.pagination.offset, this.state.itemsPerPage);
  }

  /**
   * This function is invoked immediately before mounting occurs.
   * @return {null}       returns nothing
   */
  componentWillMount() {
    this.props
    .fetchDocuments(this.props.pagination.offset, this.state.itemsPerPage);
  }

  /**
   * This function filters through the documents list
   * @param  {array} documents [array of document objects]
   * @return {array}           [array of filtered document objects]
   */
  filteredSearch(documents) {
    let filteredSearch = documents;
    filteredSearch = filteredSearch.filter((source) => {
      return source.access !== 'private' ||
      source.User.roleId === this.props.user.roleId;
    });
    return filteredSearch;
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
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const documents = this.filteredSearch(this.props.documents);

    return (
      <MuiThemeProvider>
        <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>
          <h1 className="main-heading">Public Documents</h1>
          <TextField
            className="search-field"
        hintText="Search Documents"
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
      onChange={number => this.getMoreDocuments((number - 1) * 9)}
       />
          <Container className="main-container" fluid>
            <div
style={{
  marginTop: '9em',
  color: 'rgba(8, 8, 8, 0.19)',
  display: `${this.state.notFound}`
}}><h1>NO DOCUMENTS AVAILABLE</h1></div>
            <Row>
              {documents.map((document, index) => {
                return (
                  <Col xs="6" md="4" key={index}>
                    <DocumentCard document={document} ReadOnly />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </MuiThemeProvider>

    );
  }
}


DocumentsList.propTypes = {
  fetchDocuments: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer,
  user: state.AuthReducer.user,
  pagination: state.PaginationReducer
}), { fetchDocuments, searchDocuments })(DocumentsList);
