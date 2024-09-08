import { query, collection, where, getDocs } from "firebase/firestore";
import "./addUser.css"
import { db } from "../../../../lib/firebase";
import { useState } from "react";

export default function addUser() {

  const [user, setUser] = useState(null);

  const handleSearch = async e =>{
    e.preventDefault() //prevents the refreshing of a page
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try{

      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username) ); //finds username in the databse which is equal to our username we type in

      const querySnapShot = await getDocs(q)

      if(!querySnapShot.empty){
        setUser(querySnapShot.docs[0].data());
      }

    }
    catch(err){
        console.log(err);
    }

  }
  return (
    <div className="addUser">
        <form onSubmit={handleSearch}>
            <input type="text" placeholder="Username" name="username" />
            <button>Search</button>
        </form>
        {user && <div className="user">
            <div className="detail">
                <img src={user.avatar || "./avatar.png"} alt="" />
                <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
        </div>}
    </div>
  )
}