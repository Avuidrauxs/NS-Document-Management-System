import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from 'material-ui/TextField';
import { fetchDocuments } from '../../actions/DocumentActions';
import DocumentCard from '../document-editor/DocumentCard';


class AdminDocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
    this.filteredSearch = this.filteredSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    return this.setState({ [event.target.name]: event.target.value });
  }

  filteredSearch(documents, searchText) {
    let filteredSearch = documents;
    if (searchText === '') {
      return filteredSearch;
    }
    filteredSearch = filteredSearch.filter((source) => {
      const text = source.title.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });
    return filteredSearch;
  }

  componentDidMount() {
    // disptching action to fetch documents here
    this.props.fetchDocuments();
  }
  render() {
    const documents = this.filteredSearch(
      this.props.documents,
      this.state.searchText);
    return (
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
        value={this.state.searchText}
        style={{
          textAlign: 'center'
        }}
      />
        <Container fluid>
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

    );
  }
}

AdminDocumentsList.propTypes = {
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer
}), { fetchDocuments })(AdminDocumentsList);
