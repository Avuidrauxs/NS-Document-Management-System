import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionOpen from 'material-ui/svg-icons/action/open-in-browser';
import OpenDocumentModal from '../modals/OpenDocumentModal';
import EditDocumentModal from '../modals/EditDocumentModal';
import DeleteDocumentModal from '../modals/DeleteDocumentModal';

/**
 * DocumentCard Component
 * @type {Object}
 */
export default class DocumentCard extends Component {

  /**
   * DocumentCard constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
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
  /**
   * This function opens the view document modal
   * @return {null}       retruns nothing
   */
  handleOpen() {
    this.setState({ openDocument: true });
  }

  /**
   * This function opens the edit document modal
   * @return {null}       retruns nothing
   */
  handleOpenEdit() {
    this.setState({ openEdit: true });
  }

  /**
   * This function opens the delete document modal
   * @return {null}       retruns nothing
   */
  handleDelete() {
    this.setState({ openDelete: true });
  }

  /**
   * This function closes the view document modal
   * @return {null}       retruns nothing
   */
  onCloseDocument() {
    this.setState({ openDocument: false });
  }

  /**
   * This function closes the edit document modal
   * @return {null}       retruns nothing
   */
  onCloseEdit() {
    this.setState({ openEdit: false });
  }

  /**
   * This function closes the delete document modal
   * @return {null}       retruns nothing
   */
  onCloseDelete() {
    this.setState({ openDelete: false });
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
  render() {
    const { title, User } = this.props.document;
    let openStyle, editStyle, deleteStyle;
    if (this.props.ReadOnly) {
      openStyle = {
        display: ''
      };
      editStyle = {
        display: 'none'
      };
      deleteStyle = {
        display: 'none'
      };
    } else {
      openStyle = {
        display: ''
      };
      editStyle = {
        display: ''
      };
      deleteStyle = {
        display: ''
      };
    }
    return (
      <div>
        <div>
          <Card style={{ width: '350px', marginTop: '20px' }}>
            <CardHeader
              className="CustomCard"
              title={`${title.substring(0, 15)}...`}
              titleColor="white"
              subtitle={`Created by ${User.username}`}
              subtitleColor="grey"
              style={{
                backgroundColor: '#00bcd4',
                textTransform: 'capitalize',
                fontWeight: 'bold'
              }}
            />
            <CardActions>
              <IconButton
                style={openStyle}
                tooltip="Open Document"
                onTouchTap={this.handleOpen}>
                <ActionOpen />
              </IconButton>
              <IconButton
                style={editStyle}
                tooltip="Edit Document"
                onTouchTap={this.handleOpenEdit}>
                <ActionEdit />
              </IconButton>
              <IconButton
                style={deleteStyle}
                tooltip="Delete Document"
                onTouchTap={this.handleDelete}>
                <ActionDelete />
              </IconButton>
            </CardActions>

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
  ReadOnly: PropTypes.bool.isRequired
};

DocumentCard.defaultProps = {
  document: {},
  ReadOnly: false
};
