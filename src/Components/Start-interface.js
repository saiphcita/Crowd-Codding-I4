import React, { Component } from 'react';
import './Start-interface.css';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { refAllUsers, refGeneralPosts, refGeneralCategory } from './DataBase.js'

class StartInterface  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: "#3C3B47",
            color2: "#3C3B47",
            StatePage: <div className="divStatePage"><h2>Create a Worker ID to enter the work page and if you already have it, you can login.</h2></div>,
            listUsers: [],
            pageTimeLoad: false
        };
      }

    componentDidMount(){
        refAllUsers.on("value", (snapshot) => {
            let AllUsers = snapshot.val();
            let listOfUsers = AllUsers.map(val => {return val.User.UserInfo.Username})
            this.setState({allUsers : AllUsers})
            this.setState({listUsers: listOfUsers})
        });
        refGeneralPosts.on("value", (snapshot) => {
            let posts = snapshot.val();
            posts = posts.map(i => { return {"category": 0, "post": i }})
            this.setState({posts : posts})
        });
        refGeneralCategory.on("value", (snapshot) => {
            let categorys = snapshot.val();
            categorys = categorys.map(i => i.categoryName)
            categorys.unshift("Select Category")
            this.setState({categorys : categorys})
        });
        setTimeout(()=> {
            this.setState({pageTimeLoad: true})
        }, 700)
    }

    
    ChangeToLogin(){
        setTimeout(()=> {
            this.setState({color1: "#3BC079"});
            this.setState({color2: "#3C3B47"});
            this.setState({StatePage: <LogIn allUsers={this.state.allUsers} listUsers={this.state.listUsers}/>});
        }, 700)
    }

    ChangeToSingUp(){
        setTimeout(()=> {
            this.setState({color2: "#3BC079"});
            this.setState({color1: "#3C3B47"});
            this.setState({StatePage:<SignUp 
                                        allUsers={this.state.allUsers} 
                                        listUsers={this.state.listUsers} 
                                        posts={this.state.posts}
                                        categorys ={this.state.categorys}
                                        />});
        }, 700)
    }

    render(){
        var pageLoad = <div style={{color: "white"}}>loading...</div>

        if(this.state.pageTimeLoad){
            pageLoad = <div>
                            <div 
                            style={{background: this.state.color1}} 
                            className="DivButton" 
                            onClick={()=>this.ChangeToLogin()}>
                                Log In
                            </div>
                            <div
                            style={{background: this.state.color2, margin: "0 0 0 6px"}} 
                            className="DivButton" 
                            onClick={()=>this.ChangeToSingUp()}>
                                Sign Up
                            </div>
                        </div>
        }else{
            pageLoad = <div style={{color: "white"}}>loading...</div>
        }

        return (
            <div className="DivBase ">
                <h3>Welcome to WokerPage</h3>
                <div className="DivForm">
                    {pageLoad}
                    {this.state.StatePage}
                </div>
            </div>
        );
    }
}

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

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            confirmPassword: "",
            replyErr: null,
            allUsers: this.props.allUsers,
            listUsers: this.props.listUsers
          };

          this.handleChangeUser = this.handleChangeUser.bind(this);
          this.handleChangePassword = this.handleChangePassword.bind(this);
          this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
      };
    
    handleClick = (event) => {
        if(this.state.user.length === 0 || this.state.password.length === 0 || this.state.confirmPassword.length === 0){
            this.setState({replyErr: "You must fill all the fields*"})
        }else{
            if(this.state.listUsers.includes(this.state.user.toLowerCase())){
                this.setState({replyErr: "This Worker ID already exists*"})
            }else{
                if(this.state.password !== this.state.confirmPassword){
                    this.setState({replyErr: "Your password doesn't match*"})
                }else{
                    var usuarios = this.state.allUsers
                    var NewUser = {
                        "User": {
                          "PostAndCategory": {
                            "Category": [],
                            "Post": []
                          },
                          "UserInfo": {
                            "Password": this.state.password,
                            "Username": this.state.user.toLowerCase()
                          }
                        }
                      };
                      NewUser.User.PostAndCategory.Category = this.props.categorys
                      NewUser.User.PostAndCategory.Post = this.props.posts
                      usuarios.push(NewUser)
                      this.setState({allUsers: usuarios})
                      this.setState({listUsers: this.state.allUsers.map(val => {return val.User.UserInfo.Username})})
                      //save the new user
                      refAllUsers.set(this.state.allUsers)
                }
            }
        }
    };
    
    handleChangeUser(e) {
        this.setState({ user: e.target.value.toLowerCase()});
        if(e.target.value.length !== 0){
            if(this.state.listUsers.includes(e.target.value.toLowerCase())){
                this.setState({replyErr: "This Worker ID already exists*"})
            }else{
                this.setState({replyErr: <div style={{color: "green"}}>Your Worker ID is correct.</div>})
            }
        }else{
            this.setState({replyErr: "Write your new Worker ID"})
        }
      };

    handleChangePassword(e) {
        this.setState({replyErr: ""})
        this.setState({ password: e.target.value });
    };

    handleChangeConfirmPassword(e) {
        this.setState({ confirmPassword: e.target.value });
        if(this.state.password !== e.target.value){
            this.setState({replyErr: "Your password doesn't match*"})
        }else{
            this.setState({replyErr: <div style={{color: "green"}}>Your Password is correct.</div>})
            this.setState({ confirmPassword: e.target.value });
        }
    };

    render(){

        var divStatus = <div className="replyErr">{this.state.replyErr}</div>;
        var url = "";
        var workerId = this.state.user;
        var passwordId = this.state.password;
        var confirmPasswordId = this.state.confirmPassword;
        if(workerId.length !== 0){
            if(!this.state.listUsers.includes(workerId)){
                if(passwordId.length !== 0 || confirmPasswordId.length !== 0){
                    if (confirmPasswordId === passwordId){
                        url = "/postAndcategory/"+workerId;
                        divStatus = <div className="replyErr"><div style={{color: "green"}}>Your Worker Id and your Password are correct</div></div>
                    }else{
                        url = "";
                    }
                }
            }else{
                url = "";
            };
        };

        return (
            <div className="DivSignup">
                <Form >
                    <FormGroup>
                        <Label for="exampleUser">New Worker ID</Label>
                        <Input
                        onChange={this.handleChangeUser} 
                        type="Worker ID" 
                        name="Worker ID" 
                        id="newUser" 
                        placeholder="Write your Worker ID"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">New Password</Label>
                        <Input
                        onChange={this.handleChangePassword} 
                        type="password" 
                        name="password" 
                        id="newPassword" 
                        placeholder="Write a password"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input
                        onChange={this.handleChangeConfirmPassword}
                        type="password" 
                        name="password" 
                        id="confirmPassword" 
                        placeholder="Write again a password"
                        />
                    </FormGroup> 

                </Form>
                <Link to={url}>
                <Button style={{float: "right"}} color="success" onClick={this.handleClick}>Submit</Button>
                </Link>
                {divStatus}
            </div> 
        );
    };
};

export default StartInterface;