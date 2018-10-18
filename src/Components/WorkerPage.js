import React, { Component } from 'react';

import Instrucciones  from './Tools/Instrucciones.js'
import NavBar  from './Tools/NavBar.js'
import AsideBar  from './Tools/AsideBar.js'
import ChatBar  from './Tools/ChatBar.js'
import PostAndCategory  from './Tools/PostAndCategory.js'
import PagePay  from './Tools/PagePay.js'

import { dbUser } from './Tools/DataBase.js'

class WorkerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statePage: 0,
      timingCategories: 0
    };
  }

  componentDidMount(){
    const refUserTimeWork = dbUser.ref("Users/"+this.props.user+"/TimeWork")
    refUserTimeWork.on("value", (snapshot) => {
      let timeDB = snapshot.val();
      this.setState({time : timeDB})
    });
  }

  changeState() {
    var time = this.state.time
    var timingCategories = this.state.timingCategories
    var intervalId = setInterval(() => {
      time++
      timingCategories++
      this.setState({time: time, timingCategories: timingCategories})
    }, 1000);

    this.setState({ statePage: 1, intervalId: intervalId}) 
  };

  changeState2() {
    clearInterval(this.state.intervalId)
    
    const refUserTimeWork= dbUser.ref("Users/"+this.props.user+"/TimeWork")
    refUserTimeWork.set(this.state.time)

    this.setState({ statePage: 2 })
  };

  render() {
    var Page = <div/>

    if(this.state.statePage === 0){
      Page = <Instrucciones button={<button onClick={this.changeState.bind(this)}>Go Ahead</button>}/>
    }else if(this.state.statePage === 1){
      Page = <div style={{height:"100%"}}><NavBar numberUser={this.props.user}/><AsideBar/><ChatBar numberUser={this.props.user}/><PostAndCategory numberUser={this.props.user} timing={this.state.timingCategories} change={this.changeState2.bind(this)}/></div>
    }else if(this.state.statePage === 2){
      Page = <div style={{height:"100%"}}><PagePay numberUser={this.props.user}/></div>
    };

    return Page
  }
}

export default WorkerPage;