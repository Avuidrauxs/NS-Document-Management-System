import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import toast from 'toastr';
import ReactQuill from 'react-quill';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Input from 'muicss/lib/react/input';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import { saveDocument, fetchDocument } from '../../actions/DocumentActions';

/**
 * EditDocumentModal Component
 * @type {Object}
 */
export class EditDocumentModal extends Component {

  /**
   * EditDocumentModal constuctor, here is where all states are initiated
   * @param  {object} props [contains props parameters passed into Component]
   * @return {null}       retruns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      access: '',
      body: '',
      checked: this.handlePropChecked(),
      hoverText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePropChecked = this.handlePropChecked.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.onBodyChanged = this.onBodyChanged.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.onDocumentUpdate = this.onDocumentUpdate.bind(this);
  }

  /**
   * This function is invoked before a mounted component receives new props.
   * @param  {object} nextProps [prop parameters just updated]
   * @return {null}       retruns nothing
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.doc.title,
      body: nextProps.doc.body,
      access: nextProps.doc.access
    });
  }

  /**
   * This function handls on mouse in events on the checkbox component
   * @return {null}       retruns nothing
   */
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

  /**
   * This function handls on mouse out events on the checkbox component
   * @return {null}       retruns nothing
   */
  handleMouseOut() {
    this.setState({ hoverText: '' });
  }

  /**
   * This function changes intial states based on onChange events
   * @param  {object} event [the events object parameter]
   *@return {null}       retruns nothing
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Checks props.access value to set initial checkbox state
   * @return {null}       retruns nothing
   */
  handlePropChecked() {
    if (this.props.doc.access === 'public') {
      return false;
    }
    return true;
  }

  /**
   * This function handles checkbox check events
   * @return {null}       retruns nothing
   */
  onChecked() {
    this.setState({ checked: !this.state.checked });
  }

  /**
   * This function handles changes in state in the React Quill body component
   * @param  {string} html [That is the body parameter from quill editor]
   * @return {[type]}       [description]
   */
  onBodyChanged(html) {
    this.setState({ body: html });
  }

  /**
   * This function dispatches an action to update document
   * @return {null}       retruns nothing
   */
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
        swal('Yaaayyy!!', `${title} saved`, 'success');
      })
      .catch((err) => { throw new Error(err); });
    } else {
      toast.warning('Please fill out all fields', 'Alert...');
    }
  }

  /**
   * this function returns a single React element ie. native DOM component
   * @return {React.Component} [A react component element]
   */
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

export default connect(state => ({
  document: state.Document
}), { saveDocument, fetchDocument })(EditDocumentModal);
