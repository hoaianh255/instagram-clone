import React, {useEffect, useState} from 'react';
import {Avatar} from '@material-ui/core';
import {db} from "../../firebase";
import './styles.css'
import firebase from "firebase";
function Post({value,postId,user}) {
  const {username,imgUrl,caption} = value;
  const [comment,setComment] = useState('');
  const [comments, setComments] = useState([]);

  const postComment = (e) =>{
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      comment: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('')
  }
  useEffect(() => {
    db.collection('posts').doc(postId).collection('comments').onSnapshot(snapshot => {
      setComments(snapshot.docs.map(doc => ({
        id: doc.id,
        comments: doc.data()
      })));
    })
  },[postId])
  return (
    <div className="post border border-gray-200 my-3 w-full">
      <div className="post__header flex p-3 items-center">
        <Avatar
          src="https://thethao99.com/wp-content/uploads/2020/05/gai-xinh-372.jpg"
          alt="username"
        />
        <h3 className="ml-2 font-medium">{username}</h3>
      </div>
      <img className="object-cover w-full" style={{maxHeight: "800px"}} src={imgUrl} alt="Yuri"/>

      <div className="w-full">
        <div className="comments p-3">
          <h4 className="my-1"><span className="font-bold">{username}</span> {caption}</h4>
          {comments.map(({id,comments}) =>{
            return <h4 className="my-1" key={id}><span className="font-bold">{comments.username}</span> {comments.comment}</h4>
          })}
        </div>

        <div className="relative w-full">
          <form action="">
            <input type="text"  value={comment} placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} className="block w-full p-4 text-gray-600 border-t border-gray-200 focus:outline-none"/>
            <button onClick={postComment} disabled={!comment.length} className="absolute button__disabled right-1.5 text-blue-500 font-medium top-1/2 transform -translate-y-1/2">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;