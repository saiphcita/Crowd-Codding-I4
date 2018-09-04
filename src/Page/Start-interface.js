import React, { Component } from 'react';
import './Start-interface.css';
import { refAllUsers, refGeneralPosts, refGeneralCategory } from '../Components/Tools/DataBase.js'
import LogIn  from '../Components/Login-SignUp/Login.js'
import SignUp  from '../Components/Login-SignUp/SignUp.js'


class StartInterface  extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: "#3C3B47",
            color2: "#3C3B47",
            pageTimeLoad: false,
            StatePage: <div className="divStatePage"><h2>Create a Worker ID to enter the work page and if you already have it, you can login.</h2></div>,
            listUsers: []
        };
      }

    componentDidMount(){
        refAllUsers.on("value", (snapshot) => {
            let AllUsers = snapshot.val();
            let listOfUsers = AllUsers.map(val => {return val.UserInfo.Username})
            this.setState({allUsers : AllUsers})
            this.setState({listUsers: listOfUsers})
        });
        refGeneralPosts.on("value", (snapshot) => {
            let posts = snapshot.val();
            posts = posts.map(i => { return {"category": "Select Category", "post": i }})
            this.setState({posts : posts})
        });
        refGeneralCategory.on("value", (snapshot) => {
            let categorys = snapshot.val();
            categorys = categorys.map(i => i.categoryName)
            var objectCategorys = {}
            for(let i=0; i < categorys.length; i++){
                objectCategorys[categorys[i]] = 0
            }
            this.setState({categorys : objectCategorys})
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
            pageLoad = <div style={{color:"white"}}>loading...</div>
        }

        return (
            <div style={{textAlign:"center", height:"100%", backgroundColor:"#F2F4F4"}}>
                <h3 style={{paddingTop:"18px"}}>Welcome to WokerPage</h3>
                <div className="DivForm">
                    {pageLoad}
                    {this.state.StatePage}
                </div>
            </div>
        );
    }
}

export default StartInterface;