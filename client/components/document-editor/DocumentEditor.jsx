import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import jwt from 'jwt-decode';
import Container from 'muicss/lib/react/container';
import RaisedButton from 'material-ui/RaisedButton';
import Input from 'muicss/lib/react/input';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { saveDocument } from '../../actions/DocumentActions';
import GeneralSnackbar from '../snackbar/GeneralSnackbar';

/*
 * Simple editor component
 */
class DocumentEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      title: '',
      access: 'public',
      checked: false,
      hoverText: '',
      openSnackbar: false,
      snackbarMsg: '',
      errorSave: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDocumentSave = this.onDocumentSave.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ errorSave: false });
  }
  handleChecked() {
    this.setState({
      checked: !this.state.checked,
    });
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

  onDocumentSave() {
    const decoded = jwt(localStorage.getItem('jwt-token'));
    if (this.state.title !== '' && this.state.editorHtml !== '') {
      this.props.saveDocument({
        title: this.state.title,
        body: this.state.editorHtml,
        access: this.state.access,
        authorId: decoded.id
      }).then(() => {
        this.props.history.push('/dashboard');
        this.setState({
          openSnackbar: true,
          snackbarMsg: `${this.state.title} saved`
        });
      })
      .catch((err) => { throw new Error(err); });
    } else {
      this.setState({
        openSnackbar: true,
        snackbarMsg: 'Document save failed'
      });
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onChange(html) {
    this.setState({ editorHtml: html });
  }


  render() {
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
        <div>
          <Container fluid style={{ marginTop: '100px' }}>
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
       onClick={this.handleChecked}
       onMouseEnter={this.handleMouseIn}
       onMouseOut={this.handleMouseOut}
       label={this.state.hoverText}
       style={styles.checkbox}
     />
            <ReactQuill
          theme={'snow'}
          onChange={this.onChange}
          name="editorHtml"
          value={this.state.editorHtml}
          modules={DocumentEditor.modules}
          formats={DocumentEditor.formats}
          placeholder="Write Something..."
          style={{ height: '400px' }}
         />
            <RaisedButton
          label="SAVE"
          primary
          style={{ textAlign: 'center' }}
          onClick={this.onDocumentSave} />
          </Container>
        </div>
        <div>
          <Dialog
          title="Cant Save yet!!"
          actions={<FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />}
          modal
          open={this.state.errorSave}
        >
          Please fill out both Title and Body
        </Dialog>
        </div>
        <GeneralSnackbar
          openSnackbar={this.state.openSnackbar}
          message={this.state.snackbarMsg}
          />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
DocumentEditor.modules = {
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
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
DocumentEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

/*
 * PropType validation
 */
DocumentEditor.propTypes = {
  saveDocument: PropTypes.func.isRequired,
  history: PropTypes.object
};

export default withRouter(connect(null, { saveDocument })(DocumentEditor));
