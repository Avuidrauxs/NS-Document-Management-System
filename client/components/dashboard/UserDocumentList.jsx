import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import { fetchUserDocuments } from '../../actions/DocumentActions';
import DocumentCard from '../document-editor/DocumentCard';


class UserDocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      currentPage: 1,
      itemsPerPage: 8
    };
    this.handleClick = this.handleClick.bind(this);
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  filteredSearch(documents, searchText) {
    let filteredSearch = documents;
    filteredSearch = filteredSearch.filter((source) => {
      const text = source.title.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });
    return filteredSearch;
  }
  componentDidMount() {
    const decoded = jwt(localStorage.getItem('jwt-token'));
    // disptching action to fetch documents here
    this.props.fetchUserDocuments(decoded.id);
  }
  render() {
    const decoded = jwt(localStorage.getItem('jwt-token'));
    const { currentPage, itemsPerPage } = this.state;
    const documents = this.filteredSearch(
      this.props.documents,
      this.state.searchText);
    // Logic for pagination
    const indexOfLastDocument = currentPage * itemsPerPage;
    const indexofFirstDocument = indexOfLastDocument - itemsPerPage;
    const pagiDocuments = documents.slice(indexofFirstDocument, indexOfLastDocument);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(documents.length / itemsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
             key={number}
             id={number}
             onClick={this.handleClick}
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
        <h1>{decoded.username} Documents</h1>
        <TextField
          hintText="Search Documents"
          fullWidth
          name="searchText"
          onChange={this.onChange}
          value={this.state.searchText}
          style={{
            textAlign: 'center'
          }}
        />
        <div>
          <ul className="page-numbers">
            {renderPageNumbers}
          </ul>
        </div>
        <Container fluid>
          <Row>

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
  documents: PropTypes.array.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer
}), { fetchUserDocuments })(UserDocumentsList);
