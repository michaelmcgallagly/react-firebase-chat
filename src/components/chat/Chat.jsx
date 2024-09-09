import "./chat.css"
import EmojiPicker from "emoji-picker-react";
import {useState, useRef, useEffect} from "react";
import { db } from "../../lib/firebase";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";


export default function Chat() {

  const[chat, setChat] = useState()
  const [open, setOpen] =useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file:null,
    url:"",

  });


  const { currentUser} = useUserStore();
  const { chatId, user} = useChatStore();


  const endRef = useRef(null);

  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: "smooth"});
  },[])

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",chatId), (res)=>{
      setChat(res.data());
    });

    return() =>{
      unSub();
    };

  },[chatId])


  const handleEmoji = e =>{
    setText(prev=>prev + e.emoji)
    setOpen(false);

    }

    const handleImg = e =>{ //This allows us to handle the uploading of an avatar image and display it to the user
      if(e.target.files[0]){
      setImg({
          file:e.target.files[0],
          url: URL.createObjectURL(e.target.files[0])
     
      })
  }
 }

  console.log(text);

  const handleSend = async ()=>{
    if(!text === "") return;

    let imgUrl = null;

    try{
      if(img.file){
        imgUrl = await upload(img.file)
      }
    

    await updateDoc(doc(db,"chats",chatId),{
      messages:arrayUnion({
        senderId: currentUser.id,
        text,
        createdAt: new Date(),
        ...(imgUrl && {img: imgUrl}),
      }),

    });

    const userIDs = [currentUser.id, user.id]

    userIDs.forEach(async(id)=>{

    const userChatsRef = doc(db,"userchats",id);
    const userChatsSnapshot = await getDoc(userChatsRef)

    if(userChatsSnapshot.exists()){
      const userChatsData = userChatsSnapshot.data();

      const chatIndex =  userChatsData.chats.findIndex(c=> c.chatId === chatId)

      userChatsData.chats[chatIndex].lastMessage = text
      userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
      userChatsData.chats[chatIndex].updatedAt = Date.now()

      await updateDoc(userChatsRef,{
        chats: userChatsData.chats,

      })
    }
  });

    }
    
    catch(err){
      console.log(err);
    }
  }
  


  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt=""/>
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
        
      </div>
      
      <div className="center">
        
        { chat?.messages?.map((message) =>(
          <div className="message own" key={message?.createAt}>
          <div className="texts">
         {message.img && <img src={message.img} alt="" />}

            <p>{message.text}</p>
            {/*<span>{message.createdAt}</span>*/}
          </div>
        </div>
        ))
        
        }
        <div ref={endRef}></div>

      </div>
      <div className="bottom">
        <div className="icons">
          <label id="file">
          <img src="./img.png" alt="" />
          </label>
          <input type="file" id="file" style={{display:"none"}} onChange={handleImg}/>
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input 
        type="text" 
        placeholder="Type a message..." 
        value={text}
        onChange={e=> setText(e.target.value)}
        />

        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={()=> setOpen(prev=>!prev)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}