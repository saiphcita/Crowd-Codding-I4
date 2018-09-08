import React, { Component } from 'react';
import { refAllUsers } from '../Components/Tools/DataBase.js'
import StartInterface from '../Components/StartInterface.js';
import WorkerPage from '../Components/WorkerPage.js';

class InterfaceWorker4 extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }

    componentWillMount(){
        localStorage.getItem("WorkerId") && this.setState({workerId: localStorage.getItem("WorkerId")});
        localStorage.getItem("WorkerPassword") && this.setState({workerPassword: localStorage.getItem("WorkerPassword")});
    };

    componentDidMount(){
        localStorage.getItem("WorkerId") && this.setState({pageWorker:null});
        refAllUsers.on("value", (snapshot) => {
            let Users = snapshot.val();
            let listOfUsers = Users.map(val => {return val.UserInfo.Username})
            if(listOfUsers.includes(this.state.workerId)){
                var numerOfUser = listOfUsers.indexOf(this.state.workerId)
                if(Users[numerOfUser].UserInfo.Password === this.state.workerPassword){
                    this.setState({numberOfUser: numerOfUser})
                    this.setState({pageWorker: true})
                }else{this.setState({pageWorker: false})}
            }else{
                this.setState({pageWorker:false});
            }
        });
    }

    render() {
        var page = <StartInterface />
        if(this.state.pageWorker){
            page = <WorkerPage user={this.state.numberOfUser}/>
        }else if (this.state.pageWorker === null){
            page = <div/>
        }else{
            page = <StartInterface />
        }
        return (page);
    };
}

export default InterfaceWorker4;