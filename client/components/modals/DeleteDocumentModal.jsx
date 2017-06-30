import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { deleteDocument } from '../../actions/DocumentActions';
import GeneralSnackbar from '../snackbar/GeneralSnackbar';

class DeleteDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelete: this.props.openDelete,
      openSnackbar: false,
      snackbarMsg: ''
    };
    this.onDocumentDelete = this.onDocumentDelete.bind(this);
  }
  onDocumentDelete() {
    this.props.deleteDocument(this.props.doc.id)
    .then(() => {
      this.setState({
        openSnackbar: true,
        snackbarMsg: `${this.props.doc.title} deleted`
      });
      this.props.closeDelete();
    })
    .catch((err) => { throw new Error(err); });
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
onTouchTap={this.onDocumentDelete}
/>];
    return (
      <div>
        <Dialog
                      actions={actions}
                      modal
                      autoScrollBodyContent
                      open={this.props.openDelete}
                    >
        Are you sure you want to delete <strong>{title}</strong> ?
      </Dialog>
        <GeneralSnackbar
        openSnackbar={this.state.openSnackbar}
        message={this.state.snackbarMsg}
        />
      </div>
    );
  }
}

DeleteDocumentModal.propTypes = {
  openDelete: PropTypes.bool.isRequired,
  closeDelete: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};

DeleteDocumentModal.defaultProps = {
  openDelete: false,
};

export default connect(null, { deleteDocument })(DeleteDocumentModal);
