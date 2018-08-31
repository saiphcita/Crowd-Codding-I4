import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import SelectForCategory  from '../Components/Tools/SelectForCategory.js'
import Dropdown  from '../Components/Tools/Dropdown.js'
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      value: [],
      category: [],
      heightPC: "100%"
    };
  }

  componentDidMount() {
    const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");    
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
      // var arrayxx = posts
      // for (let i = 0; i < posts.length; i++) { 
      //   arrayxx[i].category = 0;
      // };
      // refUserPost.set(arrayxx);
    });

    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });

    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      let PostOfUser = AllUsers.map( val => val.User.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
    });
  };

  render() {
    return (
      <div style={{height:"92%", textAlign:"center"}}>
        <div className="DivPostCategory" style={{height:this.state.heightPC, maxHeight:this.state.heightPC}}>
          <div className="titleList">
            <li style={{width:"3.5%", maxWidth:"3.5%", padding:"0"}}>No.</li>
            <li style={{width:"58%", maxWidth:"58%"}}>Comentario</li>
            <li style={{width:"18%", maxWidth:"18%"}}>Categoría</li>
            <li style={{width:"20.5%", maxWidth:"20.5%"}}>Estadística</li>
          </div>
          {this.state.post.map((val, ind) =>{
            //esto es para la estadistica.
            var estadistica = ""
            let ArrayValores = this.state.PostOfUser.map(val => parseInt(val[ind].category, 10));
            var Postvalores = [];
            for (let i = 0; i < ArrayValores.length; i++) {
              if(ArrayValores[i] > 0){ Postvalores.push(ArrayValores[i]) };
            };
            let TotalValores = Postvalores.length
            var percentage = {};
            for (let i = 0; i < TotalValores; i++) { percentage[Postvalores[i]] = percentage[Postvalores[i]] ? Number(percentage[Postvalores[i]]) + 1 : 1 };  
            if(Number(val.category) !== 0){
              estadistica = <Dropdown numero={ind+1} objectEstadistica={percentage} numberUser={this.props.numberUser}/>  
            }else{ estadistica = "You must select a Category" };
            //Aqui termina lo de estadistica

            return (
              <div key={ind} className="NCClist">
                <li key={ind} style={{width:"3.5%", maxWidth:"3.5%", textAlign:"center", padding:"0"}}>{ind+1}</li>
                <li key={val.post} style={{width:"58%", maxWidth:"58%"}}>{val.post}</li>
                <li style={{width:"18%", maxWidth:"18%", padding:"0"}}>
                  {<SelectForCategory id={ind} listCategory={this.state.category} categoryValue={this.state.value[ind]}
                    handleChange={(event) =>{
                      const refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
                      let newValue = this.state.value.slice();
                      newValue[ind] = event.target.value;
                      //save in firebase
                      let newPost = this.state.post;
                      for (let i = 0; i < newPost.length; i++) {
                        newPost[i].category = newValue[i]
                      };
                      this.setState({post: newPost});
                      refUserPost.set(newPost);
                    }}
                  />}
                </li>
                <li style={{width:"20.5%", maxWidth:"20.5%", padding:"0", textAlign:"center"}}>{estadistica}</li>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default PostAndCategory;