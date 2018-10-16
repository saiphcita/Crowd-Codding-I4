import React from 'react';
import '../CSS/Instrucciones.css';
import ListCategory  from './ListCategory.js'

class Instrucciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  render() {
    return (
      <div style={{textAlign:"center"}}>
          <header style={{backgroundColor:"black", color:"white", padding:"10px"}}>
            <h3>
              Instructions
            </h3>
          </header>
          <div className="ListInstruccion">
            <p>We are studying how people think about cryptocurrencies and Blockchain as a tool for the Governments and Society around the world.</p>
            <p>We will give you a list of Posts and you will have to categorize what you think and feel towards that post.</p>
            <p>Objective: Categorize each Post with one of the following categories.</p>
          </div>
          <div style={{display:"inline-block"}}>
              <ListCategory/>
          </div>
          <div style={{marginBottom:"20px"}} className="goButton">
            {this.props.button}
          </div>
      </div>
    );
  }
}

export default Instrucciones;