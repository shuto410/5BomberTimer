import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Button, TextField, TextFieldProps, List, ListItem, ListItemText, Box, Divider, Paper, Card, makeStyles, Grid } from '@material-ui/core'
import 'fontsource-roboto'

const useStyles = makeStyles({
  chatform: {
    outline: 'none',
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    padding: "10px 10px 10px 5px",
    display: "block",
    width: "85%",
    height: "10px",
    border: "none",
    borderBottom: "1px solid #757575 ",
    backgroundColor: "#f4f4f4",
    BorderRadius: "30px"
  },
  // chatformLabel: {
  //   color:"#999",
  //   fontSize:"18px",
  //   fontWeight:"normal",
  //   position:"absolute",
  //   pointerEvents:"none",
  //   left:"5px",
  //   top:"10px",
  //   transition:"0.2s ease all",
  //   MozTransition: "0.2s ease all",
  //   WebkitTransition: "0.2s ease all",
  // }
});

const Chat: React.FC = () => {
  const classes = useStyles();
  const host = 'wss://fivebomber.herokuapp.com';
  // const host = 'ws://localhost:4000';
  const [ws, setWs] = useState(new WebSocket(host));
  // const input = useRef<TextFieldProps | null>(null);
  const [input, setInput] = useState("");
  const [timeline, setTimeline] = useState<{id: number, time: string, msg: string}[]>([{id: 0, time: "test1", msg: "hoge"}, {id: 1, time: "test2", msg: "hoge"}, {id: 2, time: "test3", msg: "hoge"}]);
  const [onPostForm, setOnPostForm] = useState(false);
  const refOnPostForm = useRef(onPostForm);
  // const [text, setText] = useState("");

  useEffect(() => {
    ws.onopen = () => {
      console.log("open");
    }
    ws.onmessage = (response) => {
      const msg = response.data;
      console.log("received");
      console.log(msg);
      const date = new Date();
      console.log(timeline)
      const newId: number = timeline[0].id + 1;
      setTimeline([{id: newId, time: date.toLocaleTimeString(), msg: msg}, ...timeline])
    }
    ws.onclose = () => {
      console.log("closed");
      setWs(new WebSocket(host));
    }
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const submit = (event: KeyboardEvent) => {
    // const postFormIsEmpty: boolean = (input.current?.value as string).length === 0;
    // if (event.key === 'Enter' && !postFormIsEmpty) {
    //   ws.send(input.current?.value as string);
    // }
    const postFormIsEmpty: boolean = input.length === 0;
    if (event.key === 'Enter' && !postFormIsEmpty) {
      ws.send(input);
      setInput("");
    }
  }

  return (
    <div>
      <Grid container justify="flex-end">
        <Grid item xs={4}>
        <Card variant="outlined">
          {/* <TextField
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputRef={input}
            onKeyDown={(e) => {submit(e)}}
          /> */}
          <input
            type="text"
            name="Post"
            className={classes.chatform}
            onKeyDown={(e) => {submit(e)}}
            value={input}
            onChange={(e) => handleInputChange(e)}
          ></input>
          <List>
            {
              timeline.reverse().map(post => (
                <Box mt={-1} mb={-2} key={post.id}>
                  <ListItem >
                    <ListItemText primary={post.msg} secondary={post.time} />
                  </ListItem>
                </Box>
              ))
            }
          </List>
        </Card>

        </Grid>
        </Grid>
    </div>
  );
}

export default Chat;