import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import WorkerPage from '../Components/Interface-worker';
import StartInterface from '../Components/Start-interface';

import { refAllUsers} from '../Components/DataBase.js'


class RoutesID  extends Component {
  constructor(props) {
      super(props);
      this.state = {
        listUsers: []
      };
    }

    componentDidMount(){
      refAllUsers.on("value", (snapshot) => {
          let AllUsers = snapshot.val();
          let listOfUsers = AllUsers.map(val => {return val.User.UserInfo.Username})
          this.setState({listUsers: listOfUsers})
      });
    }

    render(){
      return(
        this.state.listUsers.map((val, i)=>{
          return <Route exact path={"/postAndcategory/"+val} render={props => <WorkerPage {...props} user={i} />}  key={i}/>
        })
      )
    }

}

export default () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component= {StartInterface} />
        <RoutesID/>
      </Switch>
    </BrowserRouter>
  );
