import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import Pagination from 'material-ui-pagination';
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
      notFound: 'none',
      itemsPerPage: 9
    };
    this.onChange = this.onChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.getMoreDocuments = this.getMoreDocuments.bind(this);
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
 * this function is invoked immediately after a component is mounted
 * @return {null}       returns nothing
 */
  componentDidMount() {
    // disptching action to fetch documents here
    this.props
    .fetchDocuments(this.props.pagination.offset, this.state.itemsPerPage);
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    return (
      <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>
        <h1>All Documents</h1>
        <TextField
          className="search-field"
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
        <Pagination
          className="pagination-component"
  total={this.props.pagination.pageCount}
  current={this.props.pagination.page}
  display={this.props.pagination.pageCount}
  onChange={number => this.getMoreDocuments((number - 1) * 9)}
   />
        <Container
          className="main-container"
          fluid style={{ marginBottom: '60px' }}>
          <Row>
            <div
style={{
  marginTop: '9em',
  color: 'rgba(8, 8, 8, 0.19)',
  display: `${this.state.notFound}`
}}><h1>NO DOCUMENTS AVAILABLE</h1></div>
            {this.props.documents.map((document, index) => {
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
