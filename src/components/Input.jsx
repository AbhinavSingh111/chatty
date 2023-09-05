// import React ,{ useContext, useState } from 'react'
// import Img from '../img/img.png'
// import Attach from '../img/attach.png'
// import { ChatContext } from '../context/ChatContext';
// import {AuthContext} from '../context/AuthContext';
// import { db, storage } from '../firebase';
// import { v4 as uuid } from 'uuid';
// import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc} from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// const Input = () => {
//   const [text , setText] = useState('');
//   const [img , setImg] = useState(undefined);

//   const {currentUser} = useContext(AuthContext);
//   const {data} = useContext(ChatContext);

//   const handleSend = async () => {
//     try {
//       if (img) {
//         const storageRef = ref(storage, uuid());
//         const uploadTask = uploadBytesResumable(storageRef, img);
  
//         await new Promise((resolve, reject) => {
//           uploadTask.on(
//             (error) => {
//               // Handle upload error here (e.g., set an error state)
//               console.error("Error uploading image: ", error);
//               reject(error);
//             },
//             async () => {
//               try {
//                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//                 await updateDoc(doc(db, 'chats', data.chatId), {
//                   messages: arrayUnion({
//                     id: uuid(),
//                     text,
//                     senderId: currentUser.uid,
//                     date: Timestamp.now(),
//                     img: downloadURL,
//                   }),
//                 });
//                 resolve();
//               } catch (error) {
//                 // Handle Firestore update error here
//                 console.error("Error updating Firestore with image URL: ", error);
//                 reject(error);
//               }
//             }
//           );
//         });
//       } else {
//         await updateDoc(doc(db, 'chats', data.chatId), {
//           messages: arrayUnion({
//             id: uuid(),
//             text,
//             senderId: currentUser.uid,
//             date: Timestamp.now(),
//           }),
//         });
//       }
  
//       // Update lastMessage and date in userChats for both users
//       const now = serverTimestamp();
//       const lastMessageData = {
//         text,
//         date: now,
//       };
  
//       await updateDoc(doc(db, 'userChats', currentUser.uid), {
//         [data.chatId + '.lastMessage']: lastMessageData,
//         [data.chatId + '.date']: now,
//       });
  
//       await updateDoc(doc(db, 'userChats', data.user.uid), {
//         [data.chatId + '.lastMessage']: lastMessageData,
//         [data.chatId + '.date']: now,
//       });
  
      
//     } catch (error) {
//       // Handle any unexpected errors here
//       console.error("Error in handleSend: ", error);
//     }
//     setText('');
//       setImg(undefined);
//   };
  

  // const handleSend = async () => {
  //   if (img) {
  //     const storageRef = ref(storage, uuid());

  //     const uploadTask = uploadBytesResumable(storageRef, img);

  //     uploadTask.on(
  //       (error) => {
  //         //setErr(true)
  //       }, 
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           try {
  //             await updateDoc(doc(db , 'chats', data.chatId),{
  //               messages : arrayUnion({
  //                 id:uuid(),
  //                 text,
  //                 senderId:currentUser.uid,
  //                 date:Timestamp.now(),
  //                 img:downloadURL,
  //               }),
        
  //             });
  //           } catch (error) {
  //             console.error("error form inpur line 42", error);
  //           }
            

  //         });

          
  //       }
  //     );
  //   }
  //   else {
  //     try {
  //       await updateDoc(doc(db,'chats',data.chatId),{
  //         messages : arrayUnion({
  //           id:uuid(),
  //           text,
  //           senderId:currentUser.uid,
  //           date:Timestamp.now(),
  //         }),
  //       });
  //     } catch (error) {
  //       console.error("error form inpur line 63", error);
  //     }
      
  //   }

  //   try {
  //     await updateDoc(doc(db,'userChats',currentUser.uid),{
  //       [data.chatId + '.lastMessage'] : {
  //         text,
  //       },
  //       [data.chatId + '.date'] : serverTimestamp(),
  //     });
  
  //   } catch (error) {
  //     console.error("error form inpur line 77", error);
  //   }
    
  //   try {
  //     await updateDoc(doc(db,'userChats',data.user.uid),{
  //       [data.chatId + '.lastMessage'] : {
  //         text,
  //       },
  //       [data.chatId + '.date'] : serverTimestamp(),
  //     });
  //   } catch (error) {
  //     console.error("error form inpur line 88", error);
  //   }
    


  //   setText('');
  //   setImg(undefined);
  // };


//   return (
//     <div className='input'>
//       <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text}/>
//       <div className="send">
//         <img src={Attach} alt="" />
//         <input type="file" style={{display:"none"}} id='file' onChange={(e) => setImg(e.target.files[0])} />
//         <label htmlFor="file">
//           <img src={Img} alt="" />
//         </label>
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;

import React, { useContext, useState } from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
      if (img) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Update progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error during file upload:', error);
            setUploadProgress(0);
          },
          async () => {
            // File uploaded successfully
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                await updateChatAndUserChats(downloadURL);
                setUploadProgress(0);
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
              });
          }
        );
        setText('');
        setImg(undefined);
        setUploadProgress(0);
      } else {
        // If no image, update chat with text only
        await updateChatAndUserChats();
        setText('');
      }
  
  };

  const updateChatAndUserChats = async (downloadURL = null) => {
    try {
      const message = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        img: downloadURL, // Pass the downloadURL if it exists
      };

      // Update chat
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion(message),
      });

      // Update userChats for both current user and the other user
      const chatUpdate = {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      };

      await Promise.all([
        updateDoc(doc(db, 'userChats', currentUser.uid), chatUpdate),
        updateDoc(doc(db, 'userChats', data.user.uid), chatUpdate),
      ]);
    } catch (error) {
      console.error('Error during chat and userChats update:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (text.trim() || img) {
        handleSend();
      }
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          {img ? (
            // Visual indication that a file is selected
            <img src={Img} alt="" style={{ color: 'green' }} />     
          ) : (
            // Default file select icon
            <img src={Attach} alt="" />
          )}
        </label>
        <button onClick={handleSend} disabled={!text.trim() && !img}>
          Send
        </button>
      </div>
      {uploadProgress > 0 && (
        <div className="progress-bar">
          Uploading: {uploadProgress.toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default Input;
