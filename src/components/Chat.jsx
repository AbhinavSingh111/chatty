// import React, {useContext} from 'react'
// import Messages from './Messages'
// import Input from './Input'
// import Cam from '../img/cam.png'
// import Add from '../img/add.png'
// import More from '../img/more.png'
// import { ChatContext } from '../context/ChatContext';

// const Chat = () => {

//   const {data} = useContext(ChatContext);

//   return (
//     <div className='chat'>
//       <div className="chatInfo">
//         <span>{data.user?.displayName}</span>
//         <div className="chatIcons">
//           <img src={Cam} alt="" />
//           <img src={Add} alt="" />
//           <img src={More} alt="" />
//         </div>
//       </div>
//       <Messages />
//       <Input />
//     </div>
//   )
// }

// export default Chat

import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import Cam from '../img/cam.png';
import Add from '../img/add.png';
import More from '../img/more.png';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  // Check if data.user is undefined or empty
  const isUserDataEmpty = !data.user || !data.user.displayName;

  return (
    <div className='chat'>
      <div className="chatInfo">
        {/* Conditionally render chat user display name or a placeholder */}
        <span>{isUserDataEmpty ? 'Hi there !' : data.user.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
