import React from 'react';
import { dbUser, refAllUsers } from './Tools/DataBase.js'

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

componentDidMount() {
  refAllUsers.on("value", (snapshot) => {
    let AllUsers = snapshot.val();
    const refUserInfo = dbUser.ref("Users/"+this.props.numberUser);
    var allNumberPay = AllUsers.map(val => val.UserInfo.NumberPay)
    var GetRandomNumber = (min, max) => {
      var numberRandom = Math.floor(Math.random() * (max - min) + min)
      if(!allNumberPay.includes(numberRandom)){
        return numberRandom
      }else{
        return numberRandom = Math.floor(Math.random() * (max - min) + min)
      }
    }
    if(AllUsers[this.props.numberUser].UserInfo.NumberPay === undefined){
      if(AllUsers[this.props.numberUser].UserState === "finished"){
        var newUserInfo = AllUsers[this.props.numberUser]
        var numberPay = GetRandomNumber(10000000, 99999999)
        newUserInfo.UserInfo.NumberPay = numberPay
        refUserInfo.set(newUserInfo)
      }
    }
    this.setState({numberPay: AllUsers[this.props.numberUser].UserInfo.NumberPay})
  });
};

  render() {
    return (
        <div style={{textAlign:"center", paddingTop:"12px"}}>
          <p style={{fontSize:"2rem"}}>Thank you very much for having finished your work.</p>
          <p style={{fontSize:"1.5rem"}}>Number to get the payment:</p>
          <p style={{fontSize:"1.4rem"}}>{this.state.numberPay}</p>
        </div>
    );
  }
}

export default ListCategory;