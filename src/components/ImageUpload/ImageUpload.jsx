import React, {useState} from 'react';
import {storage,db} from "../../firebase";
import firebase from 'firebase';
import LinearProgress from '@material-ui/core/LinearProgress';
function ImageUpload({username,closeCreatePost}) {
  const [image,setImage] = useState(null);
  const [progress,setProgress] = useState(0);
  const [caption,setCaption] = useState('');
  const handleChange = (e) =>{
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }
  const handleUpload = () =>{
    if(!caption.length){
      alert('Please enter a caption');
      return;
    }
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on("state_changed",(snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(progress);
    },
    //error function
    (error) => {
      console.log(error);
      alert(error.message)
    },
    () => {
      //complete function
      storage.ref("images").child(image.name).getDownloadURL().then(url =>{
        //post image inside db
        db.collection('posts').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          caption: caption,
          imgUrl: url,
          username: username
        }).catch(error => console.log(error))
        setImage(null);
        setCaption('');
        setProgress(0);
        closeCreatePost();
      }).catch(error => console.log(error))
     
    });
  }
  return (
    <div>
      {progress > 0 && <LinearProgress variant="determinate" value={progress} />}
      <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="rounded border p-4 text-lg text-gray-600 block w-full border-gray-800" placeholder="Enter a caption...."/>
      <input type="file"  onChange={handleChange} className="border border-gray-600 rounded" />
      <div className="flex">
        <button onClick={handleUpload} className="px-3 py-1 rounded text-white bg-blue-500 w-full">Post</button>
        <button onClick={closeCreatePost} className="px-3 py-1 rounded text-white bg-red-500 w-full">Cancer</button>
      </div>
    </div>
  );
}

export default ImageUpload;