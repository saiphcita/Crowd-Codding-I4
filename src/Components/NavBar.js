import React, { Component } from 'react';
import './CSS/NavBar.css';
import { Link } from 'react-router-dom';
import {refAllUsers} from './Tools/DataBase.js'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workerName: ""
    };
  }

  componentDidMount(){
    refAllUsers.on("value", (snapshot) => {
        let AllUsers = snapshot.val();
        let listOfUsers = AllUsers.map(val => {return val.User.UserInfo.Username})
        this.setState({workerName: listOfUsers[this.props.numberUser].charAt(0).toUpperCase() + listOfUsers[this.props.numberUser].slice(1)})
    });
  }

  render(){
    return (
        <div className="NavStyle">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divWorkerName">{this.state.workerName}</div>
              <Link to="/">
                <button>Log Out</button>  
              </Link>  
          </header>
        </div>
    );
  }
};

export default NavBar;