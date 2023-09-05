import React, { useContext, useEffect, useState } from 'react'
import {db} from '../firebase';
import {AuthContext} from '../context/AuthContext';
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext';


const Chats = () => {


  const [chats , setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(()=>{
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if(doc.exists()){
          setChats(doc.data());
        }
        else {
          console.log("thrown by chats comp , doc not present");
        }
        setLoading(false); // Set loading to false when data is loaded
      });
      return () => {
      unsub();
      };
    };
    currentUser.uid && getChats()
  },[currentUser.uid]);
  // console.log(Object.entries(chats));

  const handleSelect = (u) => {
    dispatch({type:'CHANGE_USER', payload: u })
  };

  return (
    <div className='chats'>
      {loading ? (
        <div>Loading...</div>
      ) : (
      Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          
          <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}> 
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
          </div>
      ))
    )}


      

    </div>
    
  );
};

export default Chats;