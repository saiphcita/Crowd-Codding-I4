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
            <li style={{width:"18%", maxWidth:"18%"}}>Category</li>
            <li style={{width:"82%", maxWidth:"82%"}}>Description</li>
          </div>
          {this.state.category.map((val, ind) =>{
            return (
              <div key={ind} className="Clist">
                <li style={{width:"18%", maxWidth:"18%"}}>{val.categoryName}</li>
                <li style={{width:"82%", maxWidth:"82%"}}>{val.categoryDefinition}</li>
              </div>
            )
          })}
        </div>
    );
  }
}

export default ListCategory;