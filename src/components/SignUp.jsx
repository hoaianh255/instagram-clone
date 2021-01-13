import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Input} from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -100%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SignUp({signUp,openSignUp,handleCloseSignUp,handleOpenSignUp}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="logo flex justify-center">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
      </div>
      <form action="" className="flex flex-col">
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
        <button className="bg-blue-800 p-2 mt-2 text-white hover:bg-blue-600" onClick={(e) => {e.preventDefault();signUp(username,email,password)}}>Sign up</button>
      </form>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpenSignUp} className="font-medium hover:text-red-500 focus:outline-none ml-4">
        Sign up
      </button>
      <Modal
        open={openSignUp}
        onClose={handleCloseSignUp}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
