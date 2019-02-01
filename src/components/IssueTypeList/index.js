import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import ModalComponent from '../Modal';
import validate from '../IssueForm/validate';
import { renderField } from '../IssueForm/renderFields';
import { createIssue, getSupportTickets, createComment, resetHomeUnauthorized } from '../../actions/homeActions';
import { toast, ToastContainer } from 'react-toastify';
import ReactTable from 'react-table';
import './style.sass';
import LoadingSpinner from '../LoadingSpinner';
import Header from '../Header';

class IssueTypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredIssue:[],
      open: false,
      file: '',
      issueId: '',
      descModal:false,
      descModalData:null
    }

    this.toggle = this.toggle.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount = () => {
    const { getSupportTickets } = this.props;
    getSupportTickets()
  }

  componentWillReceiveProps = (nextProps) => {
      const { match:{
                params:{
                    type
               }
      }} = this.props;

    const {home:{
        supportTickets
    }} = nextProps;
    if(supportTickets.data){
        if(supportTickets.data.length){
            var filteredIssues = supportTickets.data.filter(function (el) {
                return el.type == type
              });
            this.setState({
              filteredIssue:filteredIssues
            })
        }   
    }
  }

  toggle() {
    const {open} = this.state;
    this.setState({
      open: !open
    });
  }

  getFiles(event) {
    let file = event.target.files[0];
    this.setState({
      file: file,
    });
  }

  handleFormSubmit(data) {
    const { issueId } = this.state;
    const { createComment, reset } = this.props;

    let formData = new FormData();
    formData.append('issue_id', issueId );
    formData.append('comment', data.comment );
    
    createComment(formData).then(() => {
      this.toggle();
      toast.success('Comment posted')
      reset();
    }).catch(error => {
      toast.error(error.response.data.error ? error.response.data.error : 'Something went wrong');
    });
  }

  setCommentId = (values) => {
    const { original } = values;
    this.setState({
      issueId: original.issue_id
    }, ()=>{
      this.toggle()
    })
  }

  showDescription = (descData) =>{
    this.setState({
      descModal:true,
      descModalData:descData
    })
  }

  closeDescModal = () => {
    this.setState({
      descModal:false,
      descModalData:null
    })
  }
  

  render() {
    const { handleSubmit, home, history, resetHomeUnauthorized } = this.props;
    const { open, filteredIssue, descModalData } = this.state;
    const { isLoading, unauthorized } = home;

    const columns = [{
      Header: 'Issue ID',
      Cell: props => <span onClick={()=>{
        this.showDescription(props.original)
      }} className='commentIcon'>{props.original.issue_id}</span>
    }, {
      Header: 'State',
      accessor: 'state'
    }, {
      Header: 'Summary',
      accessor: 'summary'
    }, {
      Header: 'Type',
      accessor: 'type'
    },
    // {
    //   Header: 'Comment',
    //   Cell: props => <span className='commentIcon'><i onClick={()=>{
    //     this.setCommentId(props)
    //   }} className="fa fa-comments comment_icon"/></span> // Custom cell components!
    // }
    ]

    if(unauthorized){
      resetHomeUnauthorized();
      window.location = appConstants.logout_url;
      return (
        <div/>
        )
    }

    return ( 
      <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Modal style={{marginTop:`150px`}} isOpen={this.state.descModal} toggle={this.closeDescModal}>
          <ModalHeader toggle={this.closeDescModal}>{descModalData ? descModalData.issue_id : ''}</ModalHeader>
          <ModalBody>
          {descModalData ? descModalData.description == "" ?  'No description found' : descModalData.description : 'No description found'}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.closeDescModal}>Cancel</Button>
          </ModalFooter>
      </Modal>
      <Header/>
      <div className="text-center container-fluid issue_list_parent">
      <Row>
        <Col sm={12} className='text-left'>
          <i className="fa fa-arrow-left back_icon" onClick={()=>{
            history.goBack();
          }} aria-hidden="true"> Back</i>
        </Col>
      </Row>
      <ReactTable className='issue_table'
          pageSizeOptions={[5, 10, 20, 25, 50, 100]}
          defaultPageSize={10}
          data={filteredIssue}
          columns={columns}
        />
        <ToastContainer />
        <ModalComponent
          open={open}
          toggle={this.toggle}
          issueForm={false}
          handleFormSubmit={this.handleFormSubmit}
          {...this.props}
        >
          <form onSubmit={handleSubmit}>
            <Field
              name="comment"
              type="textarea"
              component={renderField}
              label="Comment"
            />
          </form>
        </ModalComponent>
      </div>
      </React.Fragment>
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
    getSupportTickets: () => dispatch(getSupportTickets()),
    createIssue: (data) => dispatch(createIssue(data)),
    createComment: (data) => dispatch(createComment(data))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'issueTypeList',
  validate,
})(IssueTypeList));