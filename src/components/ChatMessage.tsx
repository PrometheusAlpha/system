import { Stack } from "@mui/material";
import { auth } from "../firebase";
import '../App.css';
import avatar from '../assets/dummy-avatar.jpg';

function ChatMessage(props: any) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

  return (<>
    {text && <Stack className={`message ${messageClass}`} direction="row">
      <img src={photoURL || avatar} alt="avatar" className="avatar" />
      <p className="content">{text}</p>
    </Stack>}
  </>)
}

export default ChatMessage;