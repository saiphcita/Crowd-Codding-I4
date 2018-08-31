import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'react-icons-kit';
import {arrowUp} from 'react-icons-kit/icomoon/arrowUp'
import { dbUser } from './DataBase.js'

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      category: []
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    const refUserCategory = dbUser.ref("Users/"+this.props.numberUser+"/User/PostAndCategory/Category");
    refUserCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  };

  render() {
    var buttonStyle = {
        backgroundColor: "#85C1E9",
        color: "black",
        height: "100%",
        width: "100%",
        border: "0",
        borderRadius: "0",
        padding: "0",
        margin: "0"
    };
    var dropDownS = {
        backgroundColor: "#E4FFF7",
        color:"black",
        height: "auto",
        width: "320px",
        border: "2px solid black",
        borderRadius: "4px"
    };
    var numeroEstadistico = {
        float:"left", 
        color:"black", 
        backgroundColor:"#95FC5A", 
        borderRadius:"3px", 
        width:"40px", 
        textAlign:"center"
    };
    return (
      <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{height:"100%", width:"100%"}}>
        <DropdownToggle caret style={buttonStyle}>
          Ver Estadísticas.
        </DropdownToggle>
        <DropdownMenu style={dropDownS}>
          <DropdownItem style={{color:"black"}} header>{"Comentario "+this.props.numero}</DropdownItem>
          <DropdownItem divider />
          {
            Object.keys(this.props.objectEstadistica).map((key) => {
                return (
                    <DropdownItem disabled>
                        <div style={{float:"left", marginRight:"16px"}}>{this.state.category[key]}</div>
                        <div style={numeroEstadistico}> <Icon size={12} icon={arrowUp} style={{backgroundColor:"inherit", color:"inherit", padding:"0", margin:"0"}}/> {this.props.objectEstadistica[key]}</div>
                    </DropdownItem>
                )
            })
          }
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}