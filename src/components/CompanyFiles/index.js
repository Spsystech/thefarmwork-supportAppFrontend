import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.sass';
import LoadingSpinner from '../LoadingSpinner';
import { getCompanyData, getCompanyFolderData, pushToStack, popFromStack, updateFolderId } from '../../actions/companyActions';
import ShowFiles from '../ShowFiles';
import Header from '../Header';

const initialState = {
  companyName:'Company'
}
class companyFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
      }
    }

    componentDidMount = () => {
    const {getCompanyData, match:{
      params:{
        name
      }
    }} = this.props;
    this.setState({
      companyName:name
    })
    let values = {
        folderName:name
    }
    getCompanyData(values);
  }

  componentWillUnmount = () => {
    const { popFromStack, updateFolderId } = this.props;
    let resetValues = {
      index : -1
    }
    let payload = {
      folderId:''
    }
    updateFolderId(payload)
    popFromStack(resetValues)
  }
  

  componentWillReceiveProps = (nextProps) => {
    const {match:{
      params:{
        name
      }
    }, company, getCompanyData, getCompanyFolderData, updateFolderId } = nextProps;
    const {folderId} = company;
    const { companyName } = this.state;
      if(this.props.company.folderId != nextProps.company.folderId){
      if(folderId){
        let values = {
          folderId:folderId
        }
        getCompanyFolderData(values)
      }else{
        let values = {
          folderName:companyName
        }
        getCompanyData(values)
      }
    }
  }

  handleFileClick = (id, type, items) => {
    const { downloadFile, history, pushToStack, updateFolderId } = this.props;
    if(type == 'application/vnd.google-apps.folder'){
      // history.push(`/company/${companyName}/${id}`)
      let payload = {
        folderId:id
      }
      updateFolderId(payload)
      pushToStack(items)
    }else{
      let values = {
        fileId:id
      }
      downloadFile(values)
    }
  }

  resetDefaultFolder = () => {
    const { popFromStack, updateFolderId } = this.props;
    let values = {
      folderId:''
    }
    updateFolderId(values)
    let resetValues = {
      index : -1
    }
    popFromStack(resetValues)
  }

  resetBreadcrumb = (item, index) => {
    const { popFromStack, updateFolderId } = this.props;
    let values = {
      index:index
    }
    let payload = {
      folderId:item.id
    }
    updateFolderId(payload)
    popFromStack(values)
  }

  render() {
    const { company, history } = this.props;
    const { isLoading, companyData, breadcrumbStack } = company;
    const { companyName } = this.state;
    return ( 
      <React.Fragment>
      {isLoading && <LoadingSpinner/>}
    <Header/>
      <div className="text-center container-fluid issue_list_parent">
      <Row>
        <Col sm={12} className='text-left back_btn'>
          <i className="fa fa-arrow-left back_icon" onClick={()=>{
            history.goBack();
          }} aria-hidden="true"> Back</i>
        </Col>
        <Col sm={12}>    
            <Breadcrumb>
                <BreadcrumbItem onClick={()=>{
                  this.resetDefaultFolder()
                }} active className={breadcrumbStack.length == 0 ? 'active_folder breadcrumb_custom' : 'breadcrumb_custom'}>{companyName}</BreadcrumbItem>
                {breadcrumbStack.length ? breadcrumbStack.map((item, index, breadcrumbArrayListing) => {
                  return(
                    <BreadcrumbItem key={index} className={index == (breadcrumbArrayListing.length -1) ? 'active_folder breadcrumb_custom' : 'breadcrumb_custom'} onClick={()=>{
                      this.resetBreadcrumb(item, index)
                    }}>{item.name}</BreadcrumbItem>
                  )
                }) : ''}
            </Breadcrumb>
        </Col>    
        <Col md={12}>
        <hr/>
        </Col>
    </Row>
    <Row>
          {companyData.length ? companyData.map((item, index) => {
            return(
              <ShowFiles key={index} type={item.mimeType} id={item.id} name={item.name} onFileClick={()=>{
                this.handleFileClick(item.id, item.mimeType, item)
              }}/>
            )
          }) : <Col className='text-center' md={12}><p className='text-center'>No files to display</p></Col>}
        </Row>
      </div>
    </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    company: { ...state.company } || {},
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    getCompanyData: (values) => dispatch(getCompanyData(values)),
    getCompanyFolderData: (values) => dispatch(getCompanyFolderData(values)),
    pushToStack : (values) => dispatch(pushToStack(values)),
    popFromStack: (values) => dispatch(popFromStack(values)),
    updateFolderId: (values) => dispatch(updateFolderId(values))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(companyFiles);