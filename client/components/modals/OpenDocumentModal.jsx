import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const OpenDocumentModal = (props) => {
  const { title, body } = props.doc;
  return (
    <div>
      <Dialog
    title={title}
    actions={<FlatButton
  label="Cancel"
  primary
  onTouchTap={() => props.closeDocument()}
/>}
    modal
    autoScrollBodyContent
    open={props.openDocument}
  >
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Dialog>

    </div>
  );
};


OpenDocumentModal.propTypes = {
  openDocument: PropTypes.bool.isRequired,
  closeDocument: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired
};

OpenDocumentModal.defaultProps = {
  openDocument: false,
};

export default OpenDocumentModal;