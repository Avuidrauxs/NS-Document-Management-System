import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DeleteDocumentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: this.props.openDelete
    }
  }
  render() {
    const { title } = this.props.doc;
    const actions = [
      <FlatButton
        key="1"
    label="Cancel"
    primary
    onTouchTap={() => this.props.closeDelete()}
  />,
      <FlatButton
        key="2"
label="Confirm"
primary
/>];
    return (
      <Dialog
                      actions={actions}
                      modal
                      autoScrollBodyContent
                      open={this.props.openDelete}
                    >
        Are you sure you want to delete <strong>{title}</strong> ?
      </Dialog>
    );
  }
}

DeleteDocumentModal.propTypes = {
  openDelete: PropTypes.bool.isRequired,
  closeDelete: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired
};

DeleteDocumentModal.defaultProps = {
  openDelete: false,
};
