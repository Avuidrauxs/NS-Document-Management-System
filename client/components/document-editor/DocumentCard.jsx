import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import OpenDocumentModal from '../modals/OpenDocumentModal';
import EditDocumentModal from '../modals/EditDocumentModal';
import DeleteDocumentModal from '../modals/DeleteDocumentModal';

export default class DocumentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: this.props.document,
      openDocument: false,
      openEdit: false,
      openDelete: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.onCloseDocument = this.onCloseDocument.bind(this);
    this.handleOpenEdit = this.handleOpenEdit.bind(this);
    this.onCloseEdit = this.onCloseEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onCloseDelete = this.onCloseDelete.bind(this);
  }
  handleOpen() {
    this.setState({ openDocument: true });
  }
  handleOpenEdit() {
    this.setState({ openEdit: true });
  }
  handleDelete() {
    this.setState({ openDelete: true });
  }
  onCloseDocument() {
    this.setState({ openDocument: false });
  }
  onCloseEdit() {
    this.setState({ openEdit: false });
  }
  onCloseDelete() {
    this.setState({ openDelete: false });
  }
  render() {
    const { title, body, authorId } = this.props.document
    return (
      <div>
        <div>
          <Card style={{ width: '300px', marginTop: '20px' }}>
            <CardHeader
title={title}
subtitle={title}
actAsExpander
showExpandableButton
/>
            <CardActions>
              <FlatButton label="Open" onClick={this.handleOpen} />
              <FlatButton label="Edit" onClick={this.handleOpenEdit} />
              <FlatButton label="Delete" onClick={this.handleDelete} />
            </CardActions>
            <CardText expandable>
              <div dangerouslySetInnerHTML={{ __html: body }}></div>
            </CardText>
          </Card>
        </div>
        <div>
          <OpenDocumentModal
            openDocument={this.state.openDocument}
            closeDocument={this.onCloseDocument}
            doc={this.props.document} />
          <EditDocumentModal
            openEdit={this.state.openEdit}
            closeEdit={this.onCloseEdit}
            doc={this.props.document}
            />
          <DeleteDocumentModal
            openDelete={this.state.openDelete}
            closeDelete={this.onCloseDelete}
            doc={this.props.document}
            />
        </div>
      </div>
    );
  }
}

DocumentCard.propTypes = {
  document: PropTypes.object.isRequired,
};

DocumentCard.defaultProps = {
  document: {}
};
