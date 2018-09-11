import React from 'react';
import '../CSS/ListCategory.css';
import { refGeneralCategory } from './DataBase.js'

class ListCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }

  componentDidMount() {
    refGeneralCategory.on("value", (snapshot) => {
      let category = snapshot.val();
      this.setState({category : category})
    });
  }

  render() {
    return (
        <div className="DivDefinition2">
          <div className="titleList2">
            <li style={{width:"15%", maxWidth:"15%"}}>category</li>
            <li style={{width:"47%", maxWidth:"47%"}}>Description</li>
            <li style={{width:"38%", maxWidth:"38%"}}>Example</li>
          </div>
          {this.state.category.map((val, ind) =>{
            return (
              <div key={ind} className="Clist">
                <li key={ind} style={{width:"15%", maxWidth:"15%"}}>{val.categoryName}</li>
                <li key={val.post} style={{width:"47%", maxWidth:"47%"}}>{val.categoryDefinition}</li>
                <li style={{width:"38%", maxWidth:"38%"}}>{val.categoryExample}</li>
              </div>
            )
          })}
        </div>
    );
  }
}

export default ListCategory;