import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import SelectForCategory  from '../Components/Tools/SelectForCategory.js'
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      category: [],
      heightPC: "88%"
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
    });

    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });

    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      let PostOfUser = AllUsers.map( val => val.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
    });

    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser);
    refUserFinish.on("value", (snapshot) => {
      let userFs = snapshot.val();
      this.setState({userFs: userFs})
      //cartel constante felicitandolo
      if(userFs.UserState === "finished"){ 
        this.setState({fJob: true})
        this.setState({heightPC: "82%"})
      }else{ 
        this.setState({fJob: false}) 
      };
    });
  };

  finishWork() {
    const refUserFinish = dbUser.ref("Users/"+this.props.numberUser);
    var arrayPost0 = []
    for (let i = 0; i < this.state.post.length; i++) { 
      if(this.state.post[i].category === "Select Category"){ arrayPost0.push(i) };
    };
    if(arrayPost0.length === 0){
      this.setState({finishJobM: 2})
      this.setState({heightPC: "84%"})
      let user = this.state.userFs
      user.UserState = "finished"
      refUserFinish.set(user);
      this.setState({fJob: false}) 
    }else{
      this.setState({finishJobM: 1})
      this.setState({heightPC: "84%"})
      let user = this.state.userFs
      user.UserState = "working"
      refUserFinish.set(user);
      this.setState({fJob: false}) 
    }
  };

  render() {
    var finishM = <div/>
    var finishConstante = <div/>
  
    if(this.state.finishJobM === 0){
      finishM= <div/>
    }else if(this.state.finishJobM === 1){
      finishM= <div style={{height:"4%", backgroundColor:"#E82704", color:"white"}}>You have not finished Categorizing the Posts yet.</div>
    }else if(this.state.finishJobM === 2){
      finishM= <div style={{height:"4%", backgroundColor:"#4ECB0F", color:"white"}}>Congratulations, you have finished your work.</div>
    };

    if(this.state.fJob){
      finishConstante= <div style={{height:"6%", backgroundColor:"yellow", color:"black", paddingTop:"6px"}}>Thank you very much for having finished your work.</div>
    };
    return (
      <div style={{height:"92%", textAlign:"center"}}>
        {finishConstante}
        {finishM}
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"3.5%", maxWidth:"3.5%", padding:"0"}}>No.</li>
            <li style={{width:"75%", maxWidth:"75%"}}>Post</li>
            <li style={{width:"21.5%", maxWidth:"21.5%"}}>Category</li>
          </div>
          {this.state.post.map((val, ind) =>{
            //esto es Select Category y Estadistica
            var todasLasCategorias = this.state.category
            todasLasCategorias = Object.keys(todasLasCategorias).map((val)=>{return val})
            const refUserCategorySelected = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/category/")
            const refUserSate= dbUser.ref("Users/"+this.props.numberUser+"/UserState")
            //Aqui termina lo de Select Category y Estadistica
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"3.5%", maxWidth:"3.5%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"75%", maxWidth:"75%"}}>{val.post}</li>
                <li style={{width:"21.5%", maxWidth:"21.5%", padding:"0", margin:"0"}}>
                  <SelectForCategory 
                  saveCategory={refUserCategorySelected} 
                  categorias={todasLasCategorias} 
                  numberP={ind} 
                  actual={this.state.post[ind].category}
                  Change={()=>{this.setState({finishJobM: 0}); this.setState({fJob: false});}}
                  elState={refUserSate}
                  />
                </li>
              </div>
            )
          })}
        </div>
        <button onClick={this.finishWork.bind(this)} className="payButton">Finish Work</button>
      </div>
    );
  }
}

export default PostAndCategory;