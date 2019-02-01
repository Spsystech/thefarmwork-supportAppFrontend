import React from 'react';
import { Row, Col ,Card, CardBody,
  CardTitle, Alert ,ListGroup, ListGroupItem,Badge} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import './style.sass';
import Header from '../Header';
import LoadingSpinner from '../LoadingSpinner';
import IssueForm from '../IssueForm';
import { getHomeData, getSupportTickets, getIssueEnv, resetHomeUnauthorized } from '../../actions/homeActions';
import { Link } from 'react-router-dom';
import appConstants from '../../helpers/constants';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      ticketType: '',
      companyModal:false,
      sharedModal:false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { getHomeData, getSupportTickets, getIssueEnv } = this.props;
    getHomeData();
    getSupportTickets();
    getIssueEnv();
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  toogleCompanyModal = () => {
    const {companyModal} = this.state;
    this.setState({
      companyModal:!companyModal
    })
  }

  render() {
    const { home, history, resetHomeUnauthorized } = this.props;
    const { isLoading, homeData, supportTickets, unauthorized } = home;
    const { data } = homeData;
    const group = supportTickets && supportTickets.data && _.groupBy(supportTickets.data, 'type');
    
    if(unauthorized){
      resetHomeUnauthorized();
      // window.location = appConstants.logout_url;
      return (
        <div/>
        )
    }

    return (
      <React.Fragment>
        {isLoading && <LoadingSpinner/>}
        {/* {<Loader/>} */}
        <Header 
          data={data ? data : ''}
        />
        <div className="grid-wrapper common_mobile_responsive">
          <div className='container-fluid'>
            <Row>
            <Col md={6} className="file-box"> 
              <Card >
                <CardTitle>Files</CardTitle>
                <CardBody>
                  
                  <Link to={data ? `/company/${data.company_code}` : ''}><Alert color="dark">
                          <span className='gdrive_links'>{data ? `${data.company_name} Files` : 'Company Files'}</span>
                      </Alert></Link>
                      <Link to='/shared'><Alert color="dark">
                      <span className='gdrive_links'>Shared Files</span>
                      </Alert></Link>
                      
              </CardBody> 
             </Card>         
              </Col>
              <Col md={6} className='text-left Support_box'>

              <Card >
                <CardTitle>Support Tickets</CardTitle>
                <CardBody>
                  
                    <ListGroup className='mb_10_issuetypes'>
                    {
                  group ?  Object.keys(group).map((item, index) => {
                    return ( 
                      <ListGroupItem onClick={() => 
                        history.push(`/issue/${item}`
                        )} key={index} className="justify-content-between"><Badge onClick={() => 
                        history.push(`/issue/${item}`
                        )} pill>{item && group[item].length}</Badge> {item && item} </ListGroupItem>
                      );
                  }) : <ListGroupItem className="justify-content-between"> No records found </ListGroupItem>
                }                  
                    </ListGroup>   
                  <IssueForm />
              </CardBody> 
             </Card>
              </Col>
            </Row>
          </div>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  home: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    home: {...state.home} || {},
  };
}

function mapDispatchToProps(dispatch) {
  return({
    getHomeData: () => dispatch(getHomeData()),
    getSupportTickets: () => dispatch(getSupportTickets()),
    getIssueEnv: () => dispatch(getIssueEnv()),
    resetHomeUnauthorized: () => dispatch(resetHomeUnauthorized())
  });
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;