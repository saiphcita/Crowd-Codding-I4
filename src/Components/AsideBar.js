import React, { Component } from 'react';
import './CSS/AsideBar.css';
import { Collapse, Button} from 'reactstrap';
import ListCategory  from '../Components/Tools/ListCategory.js'

class AsideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      collapse: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="divAside">
        <Collapse isOpen={this.state.collapse} className="collapseEstilo">
          <Button color="primary" onClick={this.toggle} style={{margin:"8px 0 10px 10px"}}>Regresar</Button>
          <div className="divList">
            <div style={{display:"inline-block"}}>
                <ListCategory/>
            </div>
          </div>
        </Collapse>
        <div className="ShowDiv">
          <div style={{margin:"12px 0"}}>Mostrar las Definiciones de las Categorías.</div>
          <button onClick={this.toggle}>Mostrar</button>
        </div>
      </div>
    );
  }
}

export default AsideBar;