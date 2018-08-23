import React, { Component } from 'react';
import './CSS/ChatBar.css';
import { dbUser, refChatRoom } from './Tools/DataBase.js'

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayText: [],
      newText: ""
    };
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  componentDidMount(){
    refChatRoom.on("value", (snapshot) => {
        let text = snapshot.val();
        this.setState({arrayText: text})
    });
    var refUserID = dbUser.ref("Users/"+this.props.numberUser+"/User/UserInfo");
    refUserID.on("value", (snapshot) => {
      let User = snapshot.val();
      User = User.Username
      this.setState({Worker: User})
    });

  }

  handleChangeText(e) {
    this.setState({ newText: e.target.value });
  }

  pushNewText = (e) => {
    e.preventDefault()
    var arrayText = this.state.arrayText
    if(this.state.newText.length !== 0){
      var addText =this.state.Worker+": "+this.state.newText
      arrayText.push(addText)
      this.setState({ newText: "" }); 
      //save in firebase the new message
      refChatRoom.set(this.state.arrayText)
    }
  }

  render() {
    var arrayText = this.state.arrayText.map((val, i) => {
      return <div 
      key={i}
      className="EachMessage"
      style={{backgroundColor: (i%2 === 1)?'#ddd':'#efefef'}}
      >
        {val}
      </div>
    });

    return (
      <div className="DivChat">
        <p style={{color:"black", backgroundColor:"#18B68B", margin:"0", padding:"4px 0", fontWeight:"bolder"}}>CHAT</p>
          <div className="TextContianer">
            {arrayText}
          </div>
          <form onSubmit={this.pushNewText}>
            <input
              onChange={this.handleChangeText}  
              type="text"
              value={this.state.newText}
              placeholder="Type your message" 
              className="ChatInputST"/>
            <button>send</button>
          </form>
      </div>
    );
  }
}

export default ChatBar;