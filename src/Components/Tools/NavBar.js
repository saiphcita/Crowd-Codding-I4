import React, { Component } from 'react';
import '../CSS/NavBar.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workerName: ""
    };
  }

  componentWillMount(){
    localStorage.getItem("WorkerId") && this.setState({workerName: localStorage.getItem("WorkerId").charAt(0).toUpperCase() + localStorage.getItem("WorkerId").slice(1)});
  };

  logOut(){
    localStorage.setItem("WorkerId", undefined);
    localStorage.setItem("WorkerPassword", undefined)
    window.location.reload();
  };

  render(){
    return (
        <div className="NavStyle">
          <header style={{display:"table-cell", verticalAlign:"middle"}}>
            <div className="divWorkerName">{this.state.workerName}</div>
                <button onClick={this.logOut} > Log Out </button>  
          </header>
        </div>
    );
  }
};

export default NavBar;