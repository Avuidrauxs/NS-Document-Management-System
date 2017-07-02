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

/**
 * DocumentEditor Component
 * @type {Object}
 */
class DocumentEditor extends Component {

  /**
   * DocumentEditor constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDocumentSave = this.onDocumentSave.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

/**
 * This function sets the access state based on the checkbox check events
 * @return {null}       retruns nothing
 */
  handleChecked() {
    this.setState({
      checked: !this.state.checked,
    });
    if (this.state.checked) {
      this.setState({
        access: 'private'
      });
    } else {
      this.setState({
        access: 'public'
      });
    }
  }

  /**
   * This function handls on mouse in events on the checkbox component
   * @return {null}       retruns nothing
   */
  handleMouseIn() {
    if (this.state.checked) {
      this.setState({
        hoverText: 'Click to toggle Public'
      });
    } else {
      this.setState({
        hoverText: 'Click to toggle Private'
      });
    }
  }

  /**
   * This function handls on mouse out events on the checkbox component
   * @return {null}       retruns nothing
   */
  handleMouseOut() {
    this.setState({ hoverText: '' });
  }

/**
 * This function dispatches an action to save document
 * @return {null}       retruns nothing
 */
  onDocumentSave() {
    const decoded = jwt(localStorage.getItem('jwt-token'));
    if (this.state.title !== '' && this.state.editorHtml !== '') {
      this.props.saveDocument({
        title: this.state.title,
        body: this.state.editorHtml,
        access: this.state.access,
        authorId: decoded.id
      }).then(() => {
        // setTimeout(this.props.history.push('/'), 5000);
        this.setState({
          title: '',
          editorHtml: '',
          access: 'public',
          openSnackbar: true,
          snackbarMsg: `${this.state.title} saved`,
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

  /**
   * This function changes intial states based on onChange events
   * @param  {object} event [the events object parameter]
   *@return {null}       retruns nothing
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      openSnackbar: false
    });
  }

  /**
   * This function handles changes in state in the React Quill body component
   * @param  {string} html [That is the body parameter from quill editor]
   * @return {[type]}       [description]
   */
  onChange(html) {
    this.setState({ editorHtml: html });
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react componet element]
   */
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
  saveDocument: PropTypes.func.isRequired
};

export default withRouter(connect(null, { saveDocument })(DocumentEditor));
