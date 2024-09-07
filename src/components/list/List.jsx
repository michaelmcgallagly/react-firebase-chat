import "./list.css"
import UserInfo from "./userinfo/Userinfo.jsx"
import ChatList from "./chatList/ChatList.jsx"


export default function List() {
  return (
    <div className="list">
        <UserInfo/>
        <ChatList/>
    </div>
  )
}