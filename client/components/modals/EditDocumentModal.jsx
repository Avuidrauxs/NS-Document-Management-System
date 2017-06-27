import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Input from 'muicss/lib/react/input';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { saveDocument } from '../../actions/DocumentActions';

export default class EditDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openEdit: this.props.openEdit
    };
  }
  render() {
    const { id, title, body, access } = this.props.doc;
    const modules = {
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' },
         { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    };
    const formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ];
    const actions = [
      <FlatButton
        key="1"
    label="Cancel"
    primary
    onTouchTap={() => this.props.closeEdit()}
  />,
      <FlatButton
        key="2"
label="Save"
primary
/>
    ];
    const styles = {
      title: {
        textTransform: 'capitalize',
      },
      checkbox: {
        marginBottom: 16,
      },
    };
    return (
      <Dialog
                      actions={actions}
                      modal
                      autoScrollBodyContent
                      open={this.props.openEdit}
                    >
                    <Input
                  hint="Title"
                  required
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  style={styles.title}
                  />
                  <Checkbox
             checkedIcon={<VisibilityOff />}
             uncheckedIcon={<Visibility />}
             checked={access}
             onClick={this.handleChecked}
             onMouseEnter={this.handleMouseIn}
             onMouseOut={this.handleMouseOut}
             label={this.state.hoverText}
             style={styles.checkbox}
           />
        <ReactQuill
                  theme={'snow'}
                  name="editorHtml"
                  value={body}
                  modules={modules}
                  formats={formats}
                 />
      </Dialog>
    );
  }
}

EditDocumentModal.propTypes = {
  openEdit: PropTypes.bool.isRequired,
  closeEdit: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired
};

EditDocumentModal.defaultProps = {
  openEdit: false,
};
