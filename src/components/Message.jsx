import React ,{ useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../context/ChatContext';
import {AuthContext} from '../context/AuthContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const ref = useRef();

  try {
    useEffect(()=>{
      ref.current?.scrollIntoView({behavior:'smooth'});
    },[message]);
  } catch (error) {
    console.log("messages not present in firebase , coming from message");
  }
  

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text && message.text}</p>
        {message.img && <img src={message.img} alt="" />}

      </div>

    </div>
  );
};

export default Message;