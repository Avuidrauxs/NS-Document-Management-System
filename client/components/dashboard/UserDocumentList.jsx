import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import IconLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { fetchUserDocuments } from '../../actions/DocumentActions';
import DocumentCard from '../document-editor/DocumentCard';


class UserDocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      pageNumbers: [],
      currentPage: 1,
      itemsPerPage: 9
    };
    this.handleClick = this.handleClick.bind(this);
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleFirstClick = this.handleFirstClick.bind(this);
    this.handleLastClick = this.handleLastClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  handleFirstClick() {
    this.setState({
      currentPage: 1
    });
  }
  handleLastClick() {
    this.setState({
      currentPage: this.state.pageNumbers.length
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
  componentWillMount() {
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
          {`${decoded.username}'s`} Documents
        </h1>
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
