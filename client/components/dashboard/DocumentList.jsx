import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import DocumentCard from '../document-editor/DocumentCard';
import { fetchDocuments, searchDocuments } from '../../actions/DocumentActions';


class DocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      currentPage: 1,
      itemsPerPage: 9 + props.pagination.offset
    };
    this.handleClick = this.handleClick.bind(this);
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }
  onClickSearch() {
    this.props.searchDocuments(this.state.searchText);
  }
  componentDidMount() {
    this.props.fetchDocuments();
  }
  filteredSearch(documents) {
    let filteredSearch = documents;
    filteredSearch = filteredSearch.filter((source) => {
      return source.access === 'public';
    });
    return filteredSearch;
  }

  render() {
    const { currentPage, itemsPerPage } = this.state;
    const documents = this.filteredSearch(this.props.documents);
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
      <MuiThemeProvider>
        <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>
          <h1>Public Documents</h1>
          <TextField
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
  documents: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer,
  pagination: state.PaginationReducer
}), { fetchDocuments, searchDocuments })(DocumentsList);
