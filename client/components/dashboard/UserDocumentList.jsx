import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { fetchDocuments } from '../../actions/DocumentActions';
import DocumentCard from '../document-editor/DocumentCard';


class UserDocumentsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // disptching action to fetch documents here
    this.props.fetchDocuments();
  }
  render() {
    const decoded = jwt(localStorage.getItem('jwt-token'));
    return (
      <div
        style={{
          marginTop: '80px',
          textAlign: 'center'
        }}>
        <h1>Documents go here</h1>
        <Container fluid>
          <Row>

            {this.props.documents.map((document, index) => {
              if (document.authorId === decoded.id) {
                return (
                  <Col xs="6" md="4" key={index}>
                    <DocumentCard document={document} />
                  </Col>
                );
              }
            })}

          </Row>
        </Container>

      </div>

    );
  }
}

UserDocumentsList.propTypes = {
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer
}), { fetchDocuments })(UserDocumentsList);
