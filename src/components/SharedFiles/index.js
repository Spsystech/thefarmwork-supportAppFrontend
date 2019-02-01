import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.sass';
import LoadingSpinner from '../LoadingSpinner';
import { getSharedData, sharedFolderData, downloadFile, updateFolderId, pushToStack, popFromStack } from '../../actions/sharedActions';
import ShowFiles from '../ShowFiles';
import Header from '../Header';


class SharedFiles extends React.Component {
  constructor(props) {
    super(props);
    
    }


  componentDidMount = () => {
    const { getSharedData, sharedFolderData } = this.props;
      getSharedData();
  }

  componentWillUnmount = () => {
    const {popFromStack, updateFolderId } = this.props;
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
        
      }
    }, shared ,getSharedData} = nextProps;
    const {folderId} = shared;
      if(this.props.shared.folderId != nextProps.shared.folderId){
      if(folderId){
        let values = {
          folderId:folderId
        }
        this.props.sharedFolderData(values)
      }else{
        getSharedData()
      }
    }
  }


  handleFileClick = (id, type, items) => {
    const { downloadFile, history, updateFolderId, pushToStack } = this.props;
    if(type == 'application/vnd.google-apps.folder'){     
      let values = {
        folderId:id
      }
      updateFolderId(values)
      pushToStack(items)
    }else{
      let values = {
        fileId:id
      }
      downloadFile(values)
    }
  }

  handleBackClick = () => {
    const {history} = this.props;
    history.goBack();
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
    const { shared } = this.props;
    const { isLoading, sharedData, breadcrumbStack } = shared;
    

    // if(isLoading) return <LoadingSpinner />;
    return ( 
      <React.Fragment>
    {isLoading && <LoadingSpinner/>}
    <Header/>
    <div className="text-center container-fluid issue_list_parent">
        <Row>
          <Col sm={12} className='text-left'>
            <i className="fa fa-arrow-left back_icon" onClick={()=>{
              this.handleBackClick()
            }} aria-hidden="true"> Back</i>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>    
              <Breadcrumb>
                  <BreadcrumbItem onClick={()=>{
                  this.resetDefaultFolder()
                }} active className={breadcrumbStack.length == 0 ? 'active_folder breadcrumb_custom' : 'breadcrumb_custom'}>Shared</BreadcrumbItem>
                {breadcrumbStack.length ? breadcrumbStack.map((item, index, breadcrumbArrayListing) => {
                  return(
                    <BreadcrumbItem key={index} className={index == (breadcrumbArrayListing.length -1) ? 'active_folder breadcrumb_custom' : 'breadcrumb_custom'} onClick={()=>{
                      this.resetBreadcrumb(item, index)
                    }}>{item.name}</BreadcrumbItem>
                  )
                }) : ''}
              </Breadcrumb>
          </Col>    
        </Row>
        <Row>
          <Col md={12}>
          <hr/>
          </Col>
        </Row>
        <Row>
          {sharedData.length ? sharedData.map((item, index) => {
            return(
              <ShowFiles key={index} type={item.mimeType} name={item.name} id={item.id} onFileClick={()=>{
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
    shared: { ...state.shared } || {},
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    getSharedData:(values)=> dispatch(getSharedData(values)),
    sharedFolderData: (values) => dispatch(sharedFolderData(values)),
    downloadFile: (values) => dispatch(downloadFile(values)),
    updateFolderId: (values) => dispatch(updateFolderId(values)),
    pushToStack : (values) => dispatch(pushToStack(values)),
    popFromStack: (values) => dispatch(popFromStack(values)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SharedFiles);