import React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import ModalComponent from '../Modal';
import validate from './validate';
import { renderField, renderDropdown } from './renderFields';
import { createIssue, getSupportTickets } from '../../actions/homeActions';
import { toast, ToastContainer } from 'react-toastify';

class IssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      file: '',
    }

    this.toggle = this.toggle.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount = () => {
    const {initialize, home:{
      issueEnv
    }} = this.props;
    if(issueEnv.data){
      let values = {
        'environment':issueEnv.data[0].default_environment
      }
      console.log(values);
      initialize(values);
    }
    
   console.log(this.props, 'initialize');
  }

  toggle() {
    const {reset} = this.props;
    this.setState({
      open: !this.state.open
    }, ()=>{
      reset();
    });
  }

  getFiles(event) {
    console.log(event.target.files, "Check files")
    let file = event.target.files;
    let tempArray = [];
    Object.keys(file).map((item, index)=> {
      tempArray.push(file[item])
    })
    console.log(tempArray)
    this.setState({
      file: tempArray,
    }, ()=>{
      console.log(this.state)
    });
  }

  handleFormSubmit(data) {
    const { file } = this.state;
    const { createIssue } = this.props;
    let localIssueType = '';
    if (data && data.issueType === 'Yes') {
      localIssueType = 'Bug';
    } else {
      localIssueType = 'Task';
    } 

    let formData = new FormData();
    formData.append('summary', data && data.summary);
    formData.append('description', data && data.description);
    formData.append('environment', data && data.environment);
    formData.append('issue_type', localIssueType);
    if(file){
      file.map((item, index)=>{
        formData.append(`attachment${index}`, item);
      })
    }

    createIssue(formData).then(() => {
      const {getSupportTickets} = this.props;
      this.toggle();
      toast.success('Issue created');
      getSupportTickets();
    }).catch(error => {
      toast.error(error.response.data.error ? error.response.data.error : 'Something went wrong');
    });
  }

  render() {
    const { handleSubmit, home } = this.props;
    const { open } = this.state;
    return (
      <div className="text-center createissue_top_placement">
        <Button
          type="submit"
          color="primary"
          onClick={() => this.setState({
            open : true,
          })}
        >Create Issue</Button>

        <ModalComponent
          open={open}
          toggle={this.toggle}
          issueForm={true}
          handleFormSubmit={this.handleFormSubmit}
          handleSubmit={handleSubmit}
          {...this.props}
        >
          <form onSubmit={handleSubmit}>
            <Field
              name="summary"
              type="text"
              component={renderField}
              label="Summary"
            />
            <Field
              name="description"
              type="textarea"
              component={renderField}
              label="Description"
            />
            <Input
              multiple
              type="file"
              onChange={(event) => this.getFiles(event)}
            />
            <br/>
            <Field
              name="environment"
              type="select"
              component={renderDropdown}
              label="Environment"
              optionValues={home && home.issueEnv.data}
            />
           <Field
              name="issueType"
              type="select"
              component={renderDropdown}
              label="Is this a bug?"
              optionValues={['Yes', 'No']}
            />
            {/* <Field
              name="issueType"
              component="select"
              style={{ width: '100%' }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Field> */}
          </form>
        </ModalComponent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: { ...state.home } || {},
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    createIssue: (data) => dispatch(createIssue(data)),
    getSupportTickets: () => dispatch(getSupportTickets()),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'issueForm',
  validate,
})(IssueForm));