import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {refAllUsers} from './Tools/DataBase.js'

class NavBar extends Component {
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
    var BarHeaderStyle = {
        backgroundColor: "#333333",
        padding: "1%",
        height: "8%",
        color: "white",
        textAlign: "left",
        display: "flex",
        justifyContent: "space-between",
    };

    var ButtonLogOut = {
        backgroundColor:" #666D6D",
        color: "black",
        borderRadius: "3px",
        cursor: "pointer",
    };

    return (
      <header style={BarHeaderStyle} >
        <div >{this.state.listUsers[this.props.numberUser]}</div>
          <Link to="/">
            <div style={ButtonLogOut} >Log Out</div>  
          </Link>  
      </header> 
    );
  }
};

export default NavBar;