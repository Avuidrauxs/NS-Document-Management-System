import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt from 'jwt-decode';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { fetchDocuments } from '../../actions/DocumentActions';


class DocumentsList extends Component {
  constructor(props) {
    super(props);
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
                    <Card key={index} style={{ width: '300px', marginTop: '20px' }}>
                      <CardHeader
     title={document.title}
     subtitle={document.title}
     actAsExpander
     showExpandableButton
   />
                      <CardActions>
                        <FlatButton label="Edit" />
                        <FlatButton label="Delete" />
                      </CardActions>
                      <CardText expandable>
                        {document.body}
                      </CardText>
                    </Card>
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
