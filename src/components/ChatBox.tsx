import { useRef, useState } from 'react';
import 'firebase/firestore';
import { auth, db } from '../firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { TextField, Stack, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ChatMessage from './ChatMessage';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import avatar from '../assets/dummy-avatar.jpg';

export default function ChatBox() {
  const dummy = useRef<HTMLSpanElement>(null);
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: 'id' });
  const { uid, photoURL } = auth.currentUser as User;
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: any) => {
    e.preventDefault();

    console.log(collection(db, 'messages').id);

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
  }

  return (<>
    <Box className="main">
      <Stack className="topbar" direction="row" sx={{ alignItems: "center" }}>
        <Button onClick={() => auth.signOut()}>Sign out</Button>
        <Link to="/profile"><img src={photoURL || avatar} className="avatar" alt="profile" /></Link>
      </Stack>
      <div className="main__messageLine">
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
        </main>
      </div>
      <form onSubmit={sendMessage} className="messageWriter">
        <TextField value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Aa" className="inputField" />
        <button type="submit" id="send_button" disabled={!formValue} >
          <SendIcon sx={{ fontSize: "2.5rem" }} />
        </button>
      </form>
    </Box>
  </>)
}
