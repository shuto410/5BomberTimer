import React, { useState, useRef, useEffect, KeyboardEvent, useContext } from 'react';
import { Button, TextField, TextFieldProps, List, ListItem, ListItemText, Box, Divider, Paper, Card, makeStyles, Grid } from '@material-ui/core'
import 'fontsource-roboto'
import { connection } from './WebSocketConnection';
import { TimerContext } from '../App';

const useStyles = makeStyles({
  chatform: {
    outline: 'none',
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    padding: "10px 10px 10px 5px",
    display: "block",
    height: "10px",
    width: "85%",
    border: "none",
    borderBottom: "1px solid #757575 ",
    backgroundColor: "#f4f4f4",
    BorderRadius: "30px"
  },
});

const Chat: React.FC = () => {
  const classes = useStyles();
  // const input = useRef<TextFieldProps | null>(null);
  const [input, setInput] = useState("");
  const [timeline, setTimeline] = useState<{id: number, time: string, userId: string, msg: string}[]>([]);
  const refTimeline = useRef(timeline);
  const chatMsgPrefix = 'chat:';
  const userId = useContext(TimerContext).userId;

  useEffect(() => {
    connection.addOnMessage((response) => {
      const data: string = response.data;
      let msg: string = '';
      // sound-{type}:{userid}
      if (data.startsWith('sound-correct')) {
        msg = 'Correct!!'
      }
      if (data.startsWith('sound-wrong')) {
        msg = 'Wrong!!'
      }
      if (data.startsWith('sound-success')) {
        msg = 'Congratulations!!'
      }
      if (data.startsWith('timer-start')) {
        msg = 'Timer Start'
      }
      if (data.startsWith('timer-stop')) {
        msg = 'Timer Stop'
      }
      if (data.startsWith('timer-reset')) {
        msg = 'Timer Reset'
      }
      if (data.startsWith('timer-increase')) {
        msg = 'Timer Increase'
      }
      if (data.startsWith('timer-decrease')) {
        msg = 'Timer Decrease'
      }
      if (data.startsWith('timer-sync')) {
        return;
      }
      // chat:{userid}:{msg}
      if (data.startsWith(chatMsgPrefix)) {
        msg = data.split(':')[2];
      }
      const userId = data.split(':')[1];
      const date = new Date();
      const newId: number = (refTimeline.current.length === 0) ? 0 : refTimeline.current[0].id + 1;
      setTimeline([
        {
          id: newId,
          time: date.toLocaleString(),
          userId: userId,
          msg: msg
        },
        ...refTimeline.current,
      ])
    })
  }, [])

  useEffect(() => {
    refTimeline.current = timeline;
  }, [timeline])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }

  const submit = (event: KeyboardEvent) => {
    const postFormIsEmpty: boolean = input.length === 0;
    if (event.key === 'Enter' && event.shiftKey && !postFormIsEmpty) {
      console.log(userId);
      connection.send(chatMsgPrefix + userId + ':' +  input);
      setInput("");
    }
  }

  return (
    <div>
      <Grid container justify="flex-end">
        <Grid item xs={8} sm={5} md={3}>
        <Card variant="outlined">
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
              timeline.map(post => (
                <Box mt={-1} mb={-2} key={post.id}>
                  <ListItem >
                    <ListItemText primary={post.msg} secondary={post.time + " ID:" + post.userId.slice(0,6)} />
                  </ListItem>
                </Box>
              ))
            }
            <Box mt={-1} mb={-2}>
              <ListItem >
                <ListItemText primary="Press Shift+Enter" />
              </ListItem>
            </Box>
          </List>
        </Card>
        </Grid>
        </Grid>
    </div>
  );
}

export default Chat;