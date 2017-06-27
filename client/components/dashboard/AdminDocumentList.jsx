import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { fetchDocuments } from '../../actions/DocumentActions';


class AdminDocumentsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // disptching action to fetch documents here
    this.props.fetchDocuments();
  }
  render() {
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
              return (
                <Col xs="6" md="4" key={index}>
                  <Card key={index} style={{ width: '300px', marginTop: '20px' }} >
                    <CardHeader
     title={document.title}
     subtitle={document.title}
     actAsExpander
     showExpandableButton
   />
                    <CardActions>
                      <FlatButton label="Open" />
                      <FlatButton label="Edit" />
                      <FlatButton label="Delete" />
                    </CardActions>
                    <CardText expandable>
                      <div dangerouslySetInnerHTML={{ __html: document.body }}></div>
                    </CardText>
                  </Card>
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
