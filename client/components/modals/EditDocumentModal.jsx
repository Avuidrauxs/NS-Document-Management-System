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
      roleChecked: false,
      disableRole: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePropChecked = this.handlePropChecked.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onBodyChanged = this.onBodyChanged.bind(this);
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.onDocumentUpdate = this.onDocumentUpdate.bind(this);
    this.handleRoleChecked = this.handleRoleChecked.bind(this);
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
   * This function sets the access state based on the checkbox check events
   * @return {null}       retruns nothing
   */
  handleChecked() {
    this.setState({
      checked: !this.state.checked,
    });
    if (this.state.checked) {
      this.setState({
        access: 'private',
        disableRole: false
      });
    } else {
      this.setState({
        access: 'public',
        disableRole: true
      });
    }
  }
    /**
     * This function sets the access state based on the checkbox check events
     * @return {null}       retruns nothing
     */
  handleRoleChecked() {
    this.setState({
      roleChecked: !this.state.roleChecked,
    });
    if (this.state.roleChecked) {
      this.setState({
        access: 'role'
      });
    }
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
    const isBodyEmpty = this.state.body !== '';
    const isBodySpaced = this.state.body !== '<p><br></p>';
    if (this.state.title !== '' && isBodyEmpty && isBodySpaced) {
      this.props.saveDocument({
        title,
        id,
        body,
        access
      }).then(() => {
        if (this.props.error) {
          toast.error('Document Update Error', 'Error...');
        } else {
          this.props.closeEdit();
          swal('Success!!', `${title} saved`, 'success');
        }
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
        className="saveEdit"
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
                        className="editModal"
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
               onClick={this.handleChecked}
               onMouseEnter={this.handleMouseIn}
               onMouseOut={this.handleMouseOut}
               label={this.state.hoverText}
               style={styles.checkbox}
             />
          <Checkbox
               checked={this.state.roleChecked}
               onClick={this.handleRoleChecked}
               disabled={this.state.disableRole}
               label="Allow Role Access"
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
  error: PropTypes.object,
  saveDocument: PropTypes.func.isRequired,
};

EditDocumentModal.defaultProps = {
  openEdit: false,
};

export default connect(state => ({
  document: state.Document,
  error: state.DocumentReducer.message
}), { saveDocument, fetchDocument })(EditDocumentModal);
