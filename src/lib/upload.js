import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {storage} from "./firebase"
const upload = async(file)=>{

    const storageRef = ref(storage, file.name);
    const date = new Date()

    const uploadTask = uploadBytesResumable(storageRef, `images/${date +file.name}`);
    

    return new Promise((resolve, reject)=>{
   uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        
      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject("Something went wrong " + error.code);
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
                });
      }
    );
});
    
}

export default upload;

