import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, TextFieldProps } from '@material-ui/core'
import 'fontsource-roboto'

const Chat: React.FC = () => {
  const host = 'wss://fivebomber.herokuapp.com:58357';
  // const host = 'ws://localhost:4000';
  const [ws] = useState(new WebSocket(host));
  const text = useRef<TextFieldProps>(null);
  // const [text, setText] = useState("");

  useEffect(() => {
    ws.onopen = () => {
      console.log("open");
    }
    ws.onmessage = (msg) => {
      const response = msg.data;
      console.log("received");
      console.log(response);
      // var messageList = document.querySelector('.messages');
      // var li = document.createElement('li');
      // li.textContent = response;
      // messageList.appendChild(li);
    }
  })

  const submit = () => {
    // if (text.current !== null) {
    //   // ws.send(text.current);
    // }
    console.log(text.current?.value)
    ws.send(text.current?.value as string)
    return false;
  }

  return (
    <div>
      <TextField
        label="Chat"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        inputRef={text}
      />
      <Button variant="outlined" onClick={() => submit()}>Submit</Button>
    </div>
  );
}

export default Chat;