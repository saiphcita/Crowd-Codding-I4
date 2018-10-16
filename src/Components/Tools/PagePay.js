import React from 'react';
import '../CSS/PagePay.css';
import { dbUser, refAllUsers } from './DataBase.js'

class PagePay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      Q5: "",
      Q6: "",
      Q7: "",
      Q8: "",     
      Q9: "",
      comment: "",
      thxDIV: <div/>
    };
    this.Q1change = this.Q1change.bind(this)
    this.Q2change = this.Q2change.bind(this)
    this.Q3change = this.Q3change.bind(this)
    this.Q4change = this.Q4change.bind(this)
    this.Q5change = this.Q5change.bind(this)
    this.Q6change = this.Q6change.bind(this)
    this.Q7change = this.Q7change.bind(this)
    this.Q8change = this.Q8change.bind(this)
    this.Q9change = this.Q9change.bind(this)

    this.commentChange = this.commentChange.bind(this)
    this.submitComment = this.submitComment.bind(this)
  }

  Q1change(event){ this.setState({Q1: event.target.value})}
  Q2change(event){ this.setState({Q2: event.target.value})}
  Q3change(event){ this.setState({Q3: event.target.value})}
  Q4change(event){ this.setState({Q4: event.target.value})}
  Q5change(event){ this.setState({Q5: event.target.value})}
  Q6change(event){ this.setState({Q6: event.target.value})}
  Q7change(event){ this.setState({Q7: event.target.value})}
  Q8change(event){ this.setState({Q8: event.target.value})}
  Q9change(event){ this.setState({Q9: event.target.value})}

  commentChange(event){
    this.setState({comment: event.target.value})
  }

  submitComment(event){
    event.preventDefault();
    const refUserHelp= dbUser.ref("Users/"+this.props.numberUser+"/UserHelp")
    var helpObject = {
      "Q1": this.state.Q1,
      "Q2": this.state.Q2,
      "Q3": this.state.Q3,
      "Q4": this.state.Q4,
      "Q5": this.state.Q5,
      "Q6": this.state.Q6,
      "Q7": this.state.Q7,
      "Q8": this.state.Q8,
      "Q9": this.state.Q9,
      "comment": this.state.comment
    }
    refUserHelp.set(helpObject)
    this.setState({thxDIV: <p>Thank you very much for helping us.</p> })
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
      <div>
          <div style={{textAlign:"center", paddingTop:"12px"}}>
            <p style={{fontSize:"2rem"}}>Thank you very much for having finished your work.</p>
            <p style={{fontSize:"1.5rem"}}>Number to get the payment:</p>
            <p style={{fontSize:"1.4rem"}}>{this.state.numberPay}</p>
          </div>
          <div style={{padding:"32px 0 64px 32px"}}>

            <h2>
              Help us to improve
            </h2>

            <div className="divSurveyImprove">

              <li>1- Do you find this page intuitive?</li>
              <form>
                Very intuitive <input type="radio" name="intuitive" value="Very intuitive" onChange={this.Q1change} /> <br/>
                Little intuitive <input type="radio" name="intuitive" value="Little intuitive" onChange={this.Q1change} /><br/>
                Indifferent <input type="radio" name="intuitive" value="Indifferent"  onChange={this.Q1change}/><br/>
                Nothing intuitive <input type="radio" name="intuitive" value="Nothing intuitive" onChange={this.Q1change}/><br/>
              </form>

              <li>2- This page was comfortable to work?</li>
              <form>
                Very comfortable <input type="radio" name="comfortable" value="Very comfortable" onChange={this.Q2change}/> <br/>
                Little comfortable <input type="radio" name="comfortable" value="Little comfortable" onChange={this.Q2change}/><br/>
                Indifferent <input type="radio" name="comfortable" value="Indifferent" onChange={this.Q2change}/><br/>
                Nothing comfortable <input type="radio" name="comfortable" value="Nothing comfortable" onChange={this.Q2change}/><br/>
              </form>


              <li>3- What would you improve on this page?</li>
              <form>
                Design <input type="radio" name="improve" value="Design" onChange={this.Q3change}/><br/>
                Style <input type="radio" name="improve" value="Style" onChange={this.Q3change}/><br/>
                Content <input type="radio" name="improve" value="Content" onChange={this.Q3change}/><br/>
                Accessibility <input type="radio" name="improve" value="Accessibility" onChange={this.Q3change}/><br/>
                Nothing <input type="radio" name="improve" value="Nothing" onChange={this.Q3change}/><br/>
              </form>

              <li>4- What you don't like on this page?</li>
              <form>
                Design <input type="radio" name="improve" value="Design" onChange={this.Q4change}/><br/>
                Style <input type="radio" name="improve" value="Style" onChange={this.Q4change}/><br/>
                Content <input type="radio" name="improve" value="Content" onChange={this.Q4change}/><br/>
                Accessibility <input type="radio" name="improve" value="Accessibility" onChange={this.Q4change}/><br/>
                Nothing <input type="radio" name="improve" value="Nothing" onChange={this.Q4change}/><br/>
              </form>

              <li>5- From 1 to 10 how good is the Content</li>
              <form className="divFormRadio">
                1<input type="radio" name="number" value="1" onChange={this.Q5change}/>
                2<input type="radio" name="number" value="2" onChange={this.Q5change}/>
                3<input type="radio" name="number" value="3" onChange={this.Q5change}/>
                4<input type="radio" name="number" value="4" onChange={this.Q5change}/>
                5<input type="radio" name="number" value="5" onChange={this.Q5change}/>
                6<input type="radio" name="number" value="6" onChange={this.Q5change}/>
                7<input type="radio" name="number" value="7" onChange={this.Q5change}/>
                8<input type="radio" name="number" value="8" onChange={this.Q5change}/>
                9<input type="radio" name="number" value="9" onChange={this.Q5change}/>
                10<input type="radio" name="number" value="10" onChange={this.Q5change}/>
              </form>

              <li>6- From 1 to 10 how good is the Design</li>
              <form className="divFormRadio">
                1<input type="radio" name="number" value="1" onChange={this.Q6change}/>
                2<input type="radio" name="number" value="2" onChange={this.Q6change}/>
                3<input type="radio" name="number" value="3" onChange={this.Q6change}/>
                4<input type="radio" name="number" value="4" onChange={this.Q6change}/>
                5<input type="radio" name="number" value="5" onChange={this.Q6change}/>
                6<input type="radio" name="number" value="6" onChange={this.Q6change}/>
                7<input type="radio" name="number" value="7" onChange={this.Q6change}/>
                8<input type="radio" name="number" value="8" onChange={this.Q6change}/>
                9<input type="radio" name="number" value="9" onChange={this.Q6change}/>
                10<input type="radio" name="number" value="10" onChange={this.Q6change}/>
              </form>

              <li>7- From 1 to 10 how good is the Style</li>
              <form className="divFormRadio">
                1<input type="radio" name="number" value="1" onChange={this.Q7change}/>
                2<input type="radio" name="number" value="2"  onChange={this.Q7change}/>
                3<input type="radio" name="number" value="3"  onChange={this.Q7change}/>
                4<input type="radio" name="number" value="4"  onChange={this.Q7change}/>
                5<input type="radio" name="number" value="5"  onChange={this.Q7change}/>
                6<input type="radio" name="number" value="6"  onChange={this.Q7change}/>
                7<input type="radio" name="number" value="7"  onChange={this.Q7change}/>
                8<input type="radio" name="number" value="8"  onChange={this.Q7change}/>
                9<input type="radio" name="number" value="9"  onChange={this.Q7change}/>
                10<input type="radio" name="number" value="10"  onChange={this.Q7change}/>
              </form>

              <li>8- From 1 to 10 how good is the Accessibility</li>
              <form className="divFormRadio">
                1<input type="radio" name="number" value="1"  onChange={this.Q8change}/>
                2<input type="radio" name="number" value="2" onChange={this.Q8change}/>
                3<input type="radio" name="number" value="3" onChange={this.Q8change}/>
                4<input type="radio" name="number" value="4" onChange={this.Q8change}/>
                5<input type="radio" name="number" value="5" onChange={this.Q8change}/>
                6<input type="radio" name="number" value="6" onChange={this.Q8change}/>
                7<input type="radio" name="number" value="7" onChange={this.Q8change}/>
                8<input type="radio" name="number" value="8" onChange={this.Q8change}/>
                9<input type="radio" name="number" value="9" onChange={this.Q8change}/>
                10<input type="radio" name="number" value="10" onChange={this.Q8change}/>
              </form>

              <li>9- From 1 to 10 how good is the Intuitive navigation</li>
              <form className="divFormRadio">
                1<input type="radio" name="number" value="1" onChange={this.Q9change}/>
                2<input type="radio" name="number" value="2" onChange={this.Q9change}/>
                3<input type="radio" name="number" value="3" onChange={this.Q9change}/>
                4<input type="radio" name="number" value="4" onChange={this.Q9change}/>
                5<input type="radio" name="number" value="5" onChange={this.Q9change}/>
                6<input type="radio" name="number" value="6" onChange={this.Q9change}/>
                7<input type="radio" name="number" value="7" onChange={this.Q9change}/>
                8<input type="radio" name="number" value="8" onChange={this.Q9change}/>
                9<input type="radio" name="number" value="9" onChange={this.Q9change}/>
                10<input type="radio" name="number" value="10" onChange={this.Q9change}/>
              </form>

              <li>Any comments that help us improve will be very grateful.</li>
              <form>  
                <input style={{width:"1000px", padding:"12px", height:"40px"}} type="text" value={this.state.comment} onChange={this.commentChange} />
              </form>

              <br/>
              <button onClick={this.submitComment}>Submit</button>
              {this.state.thxDIV}

            </div>
         </div>
      </div>
    );
  }
}

export default PagePay;