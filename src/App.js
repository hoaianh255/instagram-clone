import React, {useEffect, useState} from 'react';
import {Navbar,Post,ImageUpload} from "./components";
import {Avatar} from '@material-ui/core';
import {auth, db} from './firebase';
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [posts,setPosts] = useState();
  const [newPost,setNewPost] = useState(false);
  const [user,setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //auth has logged in
        setUser(authUser);
        if(authUser.displayName){
          //dont update username
        }else{
          // if we just created someone

        }
      }else{
        //auth has logged out
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    }
  },[user]);
  const login = (email,password) => {
    auth.signInWithEmailAndPassword(email,password).then(() =>  setOpenLogin(false)).catch((error) => alert(error.message));
  }
  const signUp = (username,email,password) =>{
    if(username.length < 5){
      alert('Username must more than 5 characters');
      return;
    }
    auth.createUserWithEmailAndPassword(email,password).then((authUser)=> {
      setOpenSignUp(false);
      return authUser.user.updateProfile({
        displayName: username
      })
    }).catch((error) => alert(error.message))
  }
  const closeCreatePost = () => {
    setNewPost(false);
  }
  useEffect(() => {
      db.collection('posts').onSnapshot(snapshot => {
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          posts: doc.data()
        })));
      })
  },[])
  const ButtonNavbar = () =>{
    return (
      <div className="flex">
        <Login login={login} openLogin={openLogin} handleCloseLogin={handleCloseLogin} handleOpenLogin={handleOpenLogin} />
        <SignUp signUp={signUp} openSignUp={openSignUp} handleCloseSignUp={handleCloseSignUp} handleOpenSignUp={handleOpenSignUp}/>
      </div>
    )
  }
  return (
    <div className="app">
      <Navbar>
        {user ? (
          <div className="flex items-center">
            <h2 className="font-medium underline cursor-pointer">{user.displayName}</h2>
            <button onClick={() => auth.signOut()} className="font-medium ml-1">Logout</button>
          </div>
        ) : <ButtonNavbar/>
        }
      </Navbar>
      <main className="container p-2 lg:py-3">
        <div className="lg:w-3/5 w-full">
          {user  ?  newPost ? <ImageUpload closeCreatePost={closeCreatePost} username={user.displayName}/>: <button onClick={() => setNewPost(true)} className="underline hover:text-blue-600">Create post</button> : <h1>You need login to post</h1>}
        {posts && posts.map(({id,posts}) => {
          return <Post key={id} postId={id} user={user} value={posts} />
        })}
        </div>
      </main>
    </div>
  );
}

export default App;