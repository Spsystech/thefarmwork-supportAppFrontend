import React, {Component} from 'react';
import { HashRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import axios from 'axios';

// scenes
import Home from './components/Home';
import IssueTypeList from './components/IssueTypeList';
import SharedFiles from './components/SharedFiles';
import CompanyFiles from './components/CompanyFiles';

const baseURL = `${window.location.origin}/api`;
// const baseURL = `http://192.168.1.218:3000/api`;

export default class Main extends Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }

  getStatus = () => {
    axios.get(`${baseURL}/validate/session`).then(response => {
      console.log('response', response)
      if(response.data.status == false){
        window.location = response.data.logout_url; 
      }
    });
  }

  componentDidMount = () => {
    console.log('here')
    setInterval(this.getStatus, 60000);
  }

  render(){
    return(
    <HashRouter>
      <Switch>
        <Route exact path="/" name="Home" component={Home} />
        <Route exact path="/issue/:type" name="IssueTypeList" component={IssueTypeList} />
        <Route exact path="/shared" name="SharedFiles" component={SharedFiles} />
        <Route exact path="/company/:name" name="CompanyFiles" component={CompanyFiles} />
        <Route exact path="/company/:name/:id" name="CompanyFiles" component={CompanyFiles} />
        <Route exact path="/shared/:id" name="SharedFolderFiles" component={SharedFiles} />
      </Switch>
    </HashRouter>
    )
  }
}
