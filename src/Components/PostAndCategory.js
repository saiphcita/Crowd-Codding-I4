import React, { Component } from 'react';
import './CSS/PostAndCategory.css';
import ModalExample  from './Tools/modal.js'
import SelectForCategory  from './Tools/SelectForCategory.js'
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp'
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class PostAndCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      value: [],
      category: [],
      listUsers: [],
    };
  }

  componentDidMount() {
    var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
    var refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserPost.on("value", (snapshot) => {
      let posts = snapshot.val();
      this.setState({post : posts})
      this.setState({value: posts.map(val => {return val.category})})
    });
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
    refAllUsers.on("value", (snapshot) => {
      let AllUsers = snapshot.val();
      this.setState({listUsers: AllUsers})

      let PostOfUser = AllUsers.map( val => val.User.PostAndCategory.Post)
      this.setState({PostOfUser: PostOfUser})
    });
  }

  render() {
    return (
      <div>
        <div className="DivPostCategory">
        {/* SECCION DEL NUMERO DE POSTS*/}
        <ul className="listNumberPost" style={{width: this.state.widthPost }}>
            <li className="tittleListPC" style={{padding:"8px 5px 8px 3px"}}>No.</li>
                    {this.state.post.map((val, i) => {
                      return <li key={i}>{i+1}</li>
                    })}
            </ul>
          {/* SECCION DE LOS POSTS*/}
          <ul className="listPost" style={{width: this.state.widthPost }}>
            <li className="tittleListPC">Post</li>
                    {this.state.post.map((val, i) => {
                      if(val.post.length > 38){
                        return <li key={i}>
                          {val.post.substring(0,38)}... 
                          <ModalExample 
                          post={val.post} 
                          ind={i+1} 
                          styleB="buttonShow"
                          />
                        </li>
                      }else{
                        return <li key={i}>
                          {val.post}
                        </li>
                      }
                    })}
            </ul>
            {/* SECCION DE LAS CATEGORIAS*/}
            <ul className="listCategory">
              <li className="tittleListPC">Category</li>
              {this.state.post.map((val, i) => { 
                    return <li key={i}>
                        <SelectForCategory
                        id={i}
                        listCategory={this.state.category}
                        categoryValue={this.state.value[i]}
                        handleChange={(event) =>{
                          let newValue = this.state.value.slice();
                          newValue[i] = event.target.value;
                          //save in firebase
                          var refUserPost = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Post");
                          let newPost = this.state.post;
                          for (let i = 0; i < newPost.length; i++) { 
                            newPost[i].category = newValue[i]
                          }
                          this.setState({post: newPost});
                          refUserPost.set(newPost)
                        }}
                        />
                      </li>
                    })}
              </ul>
              {/* SECCION DE LAS ESTADISTICAS */}
              <ul className="listStatistics">
                <li className="tittleListPC">Statistics of each Post</li>
                  {this.state.post.map((val, indexPost) => {
                  let ArrayValores = this.state.PostOfUser.map(val => parseInt(val[indexPost].category, 10));
                  var Postvalores = [];
                  for (let i = 0; i < ArrayValores.length; i++) {
                    if(ArrayValores[i] > 0){
                      Postvalores.push(ArrayValores[i])
                    }
                  }
                  let TotalValores = Postvalores.length
                  var percentage = {};
                  for (let i = 0; i < TotalValores; i++) {
                    percentage[Postvalores[i]] = percentage[Postvalores[i]] ? Number(percentage[Postvalores[i]]) + 1 : 1;
                  }
                  var TotalSelectors = Object.keys(percentage).length
                  
                  // THIS IS THE RESULT
                  if(Number(val.category) !== 0){
                    if (Postvalores.length === 0) {
                      return <li className="LIstatistics" key={indexPost}>
                        <div className="noUserSelected">No one has selected in this Post</div>
                      </li>
                    }else {
                      return <li className="LIstatistics" key={indexPost}>
                      <div className="StyleStatistics">
                        {
                          Object.keys(percentage).map((key, index) => {
                            if(TotalSelectors <= 3){
                              return (
                                <div key={index} className="DivStatistics" style={{width:(100/TotalSelectors)+"%"}}>
                                  <div style={{width:"auto", float:"left", backgroundColor:"#D7DBDD", padding:"1px 0"}}>
                                    <Icon size={12} icon={arrowUp} 
                                    style={{backgroundColor:"inherit", color:"#3D4040", padding:"0", margin:"0"}}/>
                                    {percentage[key]}
                                  </div>
                                    <div style={{width:"100%"}}>
                                    {this.state.category[key]}
                                  </div>
                                </div>
                              )
                            }else if(TotalSelectors === 4){
                              return (
                                <div key={index} className="DivStatistics" style={{width:(100/TotalSelectors)+"%"}}>
                                  <div style={{width:"auto", float:"left", backgroundColor:"#D7DBDD", padding:"1px 0"}}>
                                    <Icon size={12} icon={arrowUp} 
                                    style={{backgroundColor:"inherit", color:"#3D4040", padding:"0", margin:"0"}}/>
                                    {percentage[key]}
                                  </div>
                                    <div style={{width:"100%", fontSize:"0.7rem"}}>
                                    {this.state.category[key]}
                                  </div>
                                </div>
                              )
                            }else{
                              return (
                                <div key={index} className="DivStatistics" style={{width:(100/TotalSelectors)+"%"}}>
                                  <div style={{width:"auto", float:"left", backgroundColor:"#D7DBDD", padding:"1px 0"}}>
                                    <Icon size={12} icon={arrowUp} 
                                    style={{backgroundColor:"inherit", color:"#3D4040", padding:"0", margin:"0"}}/>
                                    {percentage[key]}
                                  </div>
                                    <div style={{width:"100%", fontSize:"0.55rem"}}>
                                    {this.state.category[key]}
                                  </div>
                                </div>
                              )
                            }
                          })
                        }  
                      </div>
                    </li> 
                    }
                  }else{
                    return <li className="LIstatistics" key={indexPost}>
                        <div className="noUserSelected">You must select a Category</div>
                      </li>
                  }
                  })}
                </ul>
              </div>
            </div>
    );
  }
}

export default PostAndCategory;