import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import DocumentCard from '../document-editor/DocumentCard';
import { fetchDocuments } from '../../actions/DocumentActions';


class DocumentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: false
    };
    this.handleEditClose = this.handleEditClose.bind(this);
    this.handleEditOpen = this.handleEditOpen.bind(this);
  }

  handleEditClose() {
    this.setState({ openEdit: false });
  }

  handleEditOpen() {
    this.setState({ openEdit: true });
  }

  componentWillMount() {
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
              if (document.access === 'public' || document.authorId === decoded.id) {
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


DocumentsList.propTypes = {
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
};

export default connect(state => ({
  documents: state.DocumentReducer
}), { fetchDocuments })(DocumentsList);
