import React, { Component } from 'react';

import Instrucciones  from '../Components/Instrucciones.js'
import NavBar  from '../Components/NavBar.js'
import AsideBar  from '../Components/AsideBar.js'
import ChatBar  from '../Components/ChatBar.js'
import PostAndCategory  from '../Components/PostAndCategory.js'
import PagePay  from '../Components/PagePay.js'

class WorkerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePage: 1
    };
  }

  changeState() { this.setState({ statePage: 1 }) };
  changeState2() { this.setState({ statePage: 2 }) };

  render() {
    var Page = <div/>

    if(this.state.statePage === 0){
      Page = <Instrucciones button={<button onClick={this.changeState.bind(this)}>Entendido</button>}/>
    }else if(this.state.statePage === 1){
      Page = <div style={{height:"100%"}}><NavBar numberUser={this.props.user}/><AsideBar/><ChatBar numberUser={this.props.user}/><PostAndCategory numberUser={this.props.user}  change={this.changeState2.bind(this)}/></div>
    }else if(this.state.statePage === 2){
      Page = <div style={{height:"100%"}}><PagePay numberUser={this.props.user}/></div>
    };

    return Page
  }
}

export default WorkerPage;