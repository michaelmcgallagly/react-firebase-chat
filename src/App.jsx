import List from "./components/list/List.jsx";
import Chat from "./components/chat/Chat.jsx";
import Detail from "./components/detail/Detail.jsx";
import Login from "./components/login/Login.jsx";
import Notification from "./components/notification/Notification.jsx";
const App = () => {

  const user = false;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user)=>{
      console.log(useruid);
    });

    return() =>{
      unSub();
    }
  },[]);


  return (
    <div className='container'>
      {
        user ? (  <>
          <List/>
          <Chat/>
          <Detail/>
          </>
           ) : (<Login/>)
      }
    <Notification/>
    </div>
  )
}

export default App

//utilising zustand library for user state