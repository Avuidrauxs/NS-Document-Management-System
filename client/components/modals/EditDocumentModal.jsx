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
import GeneralSnackbar from '../snackbar/GeneralSnackbar';

class EditDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.doc.title,
      access: this.props.doc.access,
      body: this.props.doc.body,
      checked: this.handlePropChecked(),
      hoverText: '',
      errorUpdate: false,
      openSnackbar: false,
      snackbarMsg: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePropChecked = this.handlePropChecked.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onBodyChanged = this.onBodyChanged.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onDocumentUpdate = this.onDocumentUpdate.bind(this);
  }
  handleClose() {
    this.setState({ errorUpdate: false });
  }
  handleMouseIn() {
    if (this.state.checked) {
      this.setState({
        hoverText: 'Click to toggle Public',
        access: 'public'
      });
    } else {
      this.setState({
        hoverText: 'Click to toggle Private',
        access: 'private'
      });
    }
  }

  handleMouseOut() {
    this.setState({ hoverText: '' });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handlePropChecked() {
    if (this.props.doc.access === 'public') {
      return false;
    }
    return true;
  }
  onChecked() {
    this.setState({ checked: !this.state.checked });
  }
  onBodyChanged(html) {
    this.setState({ body: html });
  }
  onDocumentUpdate() {
    const { title, body, access } = this.state;
    const { id } = this.props.doc;
    if (this.state.title !== '' && this.state.body !== '') {
      this.props.saveDocument({
        title,
        id,
        body,
        access
      }).then(() => {
        this.props.closeEdit();
        this.setState({
          openSnackbar: true,
          snackbarMsg: `${title} updated`
        });
      })
      .catch((err) => { throw new Error(err); });
    } else {
      this.setState({
        openSnackbar: true,
        snackbarMsg: 'Please fill out all fields'
      });
    }
  }
  render() {
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
onTouchTap={this.onDocumentUpdate}
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
      <div>
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
                    value={this.state.title}
                    onChange={this.handleChange}
                    style={styles.title}
                    />
          <Checkbox
               checkedIcon={<VisibilityOff />}
               uncheckedIcon={<Visibility />}
               checked={this.state.checked}
               onClick={this.onChecked}
               onMouseEnter={this.handleMouseIn}
               onMouseOut={this.handleMouseOut}
               label={this.state.hoverText}
               style={styles.checkbox}
             />
          <ReactQuill
                    theme={'snow'}
                    name="body"
                    onChange={this.onBodyChanged}
                    value={this.state.body}
                    modules={modules}
                    formats={formats}
                   />
        </Dialog>
        <GeneralSnackbar
          openSnackbar={this.state.openSnackbar}
          message={this.state.snackbarMsg}
          />
      </div>
    );
  }
}

EditDocumentModal.propTypes = {
  openEdit: PropTypes.bool.isRequired,
  closeEdit: PropTypes.func.isRequired,
  doc: PropTypes.object.isRequired,
  saveDocument: PropTypes.func.isRequired,
};

EditDocumentModal.defaultProps = {
  openEdit: false,
};

export default connect(null, { saveDocument })(EditDocumentModal);
