import { useState } from "react"
import "./login.css"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../../lib/firebase.js" 
import {doc, setDoc} from "firebase/firestore";
import upload from "../../lib/upload.js";
export default function Login() {

    const [avatar, setAvatar] = useState({ //tgis allows us to set the initial state of the avatar to being none as the user has not uploaded rthei pfp yet
        file:null,
        url:""
    });

    const[loading, setLoading] = useState(false);


    const handleAvatar = e =>{ //This allows us to handle the uploading of an avatar image and display it to the user
        if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
       
        })
    }
   }

const handleLogin = async (e) =>{
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const { email, password} = Object.fromEntries(formData);

    try{

        await signInWithEmailAndPassword(auth, email, password);
    }
    catch(err){
        console.log(err);
        toast.error(err.message);

    } finally{
        setLoading(false);
    }
 //   toast.warn("Hello"); //shows an error message when form is not submitted correctly
}

const handleRegister = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target) //represents our form

    const{username, email, password} = Object.fromEntries(formData);

    try{

        const res = await createUserWithEmailAndPassword(auth,email,password); //creates a suer and stores it in the database
        const imgUrl = await upload(avatar.file);

        await setDoc(doc(db,"users", res.user.uid),{
            username,
            email,
            avatar:imgUrl,
            id: res.user.uid,
            blocked:[]
        });

        await setDoc(doc(db,"userchats", res.user.uid),{
            chats:[]
        });


        toast.success("Account created you can now login!");
    }
    catch(err){
        console.log(err);
        toast.error(err.message);
    } finally{
        setLoading(false);
    }
}



  return (
    <div className="login">
        <div className="item">
            <h2>Welcome Back,</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button disabled={loading}>{loading ? "Loading": "Sign In"}</button>
            </form>
        </div>
        <div className="seperator"></div>
        <div className="item">
        <h2>Create an account</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" /> 
                    Upload an Image</label>
                <input type="file" id="file" style={{display:"none"}} onChange={handleAvatar}/>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button disabled={loading}>{loading ? "Loading": "Sign Up"}</button>
            </form>
        </div>

    </div>
  )
}