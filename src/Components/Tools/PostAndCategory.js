import React, { Component } from 'react';
import '../CSS/PostAndCategory.css';
import SelectForCategory  from './SelectForCategory.js'
import { dbUser, refAllUsers } from './DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      category: [],
      heightPC: "88%",
      finishJob: false,
      messageFinish: <div/>
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
      if(userFs.UserState === "finished"){
        this.setState({finishJob: true})
        this.setState({heightPC: "84%"})
        this.setState({messageFinish: <div style={{height:"4%", backgroundColor:"#4ECB0F", color:"white"}}>Thank you very much for having finished your work.</div>})
      }else{
        this.setState({finishJob: false})
        this.setState({heightPC: "88%"})
        this.setState({messageFinish: <div/>})
      };
      //verificando si ya termino
      var arrayPost0 = []
      for (let i = 0; i < userFs.PostAndCategory.Post.length; i++) { 
        if(userFs.PostAndCategory.Post[i].category === "Select Category"){ arrayPost0.push(i) };
      };
      var user = userFs
      if(arrayPost0.length === 0){
        user.UserState = "finished"
        refUserFinish.set(user)
      }else{
        user.UserState = "working"
        refUserFinish.set(user)
      };
    });
  };

  finishWork() {
    this.setState({heightPC: "84%"})
    this.setState({messageFinish: <div style={{height:"4%", backgroundColor:"#E82704", color:"white"}}>You have not finished Categorizing the Posts yet.</div>})
  };

  render() {
    var theFunction = this.finishWork.bind(this);
    if(this.state.finishJob){
      theFunction = this.props.change
    }
    return (
      <div style={{height:"92%", textAlign:"center"}}>
      {this.state.messageFinish}
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"3.5%", maxWidth:"3.5%", padding:"0"}}>No.</li>
            <li style={{width:"70%", maxWidth:"70%"}}>Post</li>
            <li style={{width:"25.5%", maxWidth:"25.5%"}}>Category</li>
          </div>
          {this.state.post.map((val, ind) =>{
            //esto es Select Category y Estadistica
            var todasLasCategorias = this.state.category
            todasLasCategorias = Object.keys(todasLasCategorias).map((val)=>{return val})
            const refUserCategorySelected = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/category/")
            const refUserCategoryTime = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/time/")
            const refUserCategoryHistory = dbUser.ref("Users/"+this.props.numberUser+"/PostAndCategory/Post/"+ind+"/history/")
            const refUserSate= dbUser.ref("Users/"+this.props.numberUser+"/UserState")
            //Aqui termina lo de Select Category y Estadistica
            var newHistory = val.history
            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"3.5%", maxWidth:"3.5%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"70%", maxWidth:"70%"}}>{val.post}</li>
                <li style={{width:"25.5%", maxWidth:"25.5%", padding:"0", margin:"0"}}>
                <SelectForCategory
                  //CAMBIO DE TIEMPO
                  saveTime={refUserCategoryTime}
                  timing={this.props.timing}
                  //CAMBIO DE CATEGORIA
                  saveCategory={refUserCategorySelected} 
                  categorias={todasLasCategorias} 
                  numberP={ind} 
                  actual={this.state.post[ind].category}
                  Change={()=>{this.setState({messageFinish:<div/>}); this.setState({heightPC: "88%"});}}
                  elState={refUserSate}
                  //AGREGAR EL CAMBIO AL HISTORIAL
                  newHistory={newHistory}
                  saveHistory={refUserCategoryHistory}               
                  />
                </li>
              </div>
            )
          })}
        </div>
        <button onClick={theFunction} className="payButton">Finish Work</button>
      </div>
    );
  }
}

export default PostAndCategory;