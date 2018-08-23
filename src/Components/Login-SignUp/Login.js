import React, { Component } from 'react';
import './Login.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Link } from 'react-router-dom';

class LogIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers,
            divErr: "",
          };
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.user.length === 0 && this.state.password.length === 0){
            this.setState({divErr: <div style={{color: "red"}}>Write your Worker ID and your password*</div> })
        }else{
            if(this.state.user.length !== 0){
                if(!this.state.listUsers.includes(this.state.user.toLowerCase())){
                    this.setState({divErr: <div style={{color: "red"}}>Your Worker ID doesn't exist*</div> })
                }else{
                    if(this.state.password.length === 0){
                        this.setState({divErr: <div style={{color: "red"}}>Enter your password*</div> })
                    }else if(this.state.allUsers[this.state.numberForPassowrd].User.UserInfo.Password !== this.state.password){
                        this.setState({divErr: <div style={{color: "red"}}>Your password doesn't match*</div> })
                    }
                };
            }else{
                this.setState({divErr: <div style={{color: "red"}}>Enter your Worker ID*</div> })
            }
        };
    };
    
    handleChangeUser(e) {
        this.setState({ user: e.target.value.toLowerCase() });
        if(!this.state.listUsers.includes(e.target.value.toLowerCase())){
            this.setState({divErr: <div style={{color: "red"}}>Your Worker ID is incorrect*</div> })
        }else{
            this.setState({divErr: <div style={{color: "green"}}>Your Worker ID is correct</div> })
            this.setState({ user: e.target.value });
            this.setState({ numberForPassowrd: this.state.listUsers.indexOf(e.target.value.toLowerCase())});
        }
      };
      handleChangePassword(e) {
        this.setState({ password: e.target.value });
        if(this.state.listUsers.includes(this.state.user)){
            if(this.state.allUsers[this.state.numberForPassowrd].User.UserInfo.Password !== e.target.value){
                this.setState({divErr: <div style={{color: "red"}}>Your password is incorrect*</div> })
            }else{
                this.setState({divErr: <div style={{color: "green"}}>Your Password is correct</div> })
                this.setState({ password: e.target.value });
            };
        };
    };

    render(){
        var divStatus = <div style={{display: "inline-block", float: "right"}}>{this.state.divErr}</div>;
        var url = "";
        var workerId = this.state.user;
        var passwordId = this.state.password;
        if(this.state.listUsers.includes(workerId)){
            var number = this.state.listUsers.indexOf(workerId)
            if (this.state.allUsers[number].User.UserInfo.Password === passwordId){
                url = "/postAndcategory/"+workerId;
                divStatus = <div style={{display: "inline-block", float: "right"}}><div style={{color: "green"}}>Welcome {workerId}</div></div>
            }else{
                url = "";
            }
        }else{
            url = "";
        };
        return (
            <div className="DivLogin">
                <Form>

                    <FormGroup>
                        <Label for="exampleUser">Worker ID</Label>
                        <Input 
                        onChange={this.handleChangeUser}  
                        type="Worker ID" 
                        name="Worker ID" 
                        id="exampleUser" 
                        placeholder="Write your Worker ID"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                        onChange={this.handleChangePassword}  
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="Write your password"
                        />
                    </FormGroup>   
                         
                </Form>
                <Link to={url}>
                <Button color="success" onClick={this.handleClick}>Start</Button>
                </Link>
                {divStatus}
            </div> 
        );
    }
}

export default LogIn;