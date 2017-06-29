import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class OpenDocumentModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, body } = this.props.doc;
    return (
      <div>
      <Dialog
      title={title}
      actions={<FlatButton
    label="Cancel"
    primary
    onTouchTap={() => this.props.closeDocument()}
  />}
      modal
      autoScrollBodyContent
      open={this.props.openDocument}
    >
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Dialog>

      </div>
    );
  }
}

OpenDocumentModal.propTypes = {
  openDocument: PropTypes.bool.isRequired,
  closeDocument: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired
};

OpenDocumentModal.defaultProps = {
  openDocument: false,
};
