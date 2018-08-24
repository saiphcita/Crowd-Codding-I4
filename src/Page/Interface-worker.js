import React from 'react';
import NavBar  from '../Components/NavBar.js'
import AsideBar  from '../Components/AsideBar.js'
import ChatBar  from '../Components/ChatBar.js'
import PostAndCategory  from '../Components/PostAndCategory.js'

function  WorkerPage (props) {
  return (
      <div style={{height:"100%"}} >
        <NavBar numberUser={props.user}/>
        <AsideBar/>
        <ChatBar numberUser={props.user}/>
        <PostAndCategory numberUser={props.user}/>
      </div>
  );
}

export default WorkerPage;