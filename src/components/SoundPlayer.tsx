import React, { useEffect, useState, useContext, useRef } from 'react';
import { Grid, IconButton, Box, Slider } from '@material-ui/core'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import 'fontsource-roboto'
import { connection } from './WebSocketConnection';
import { TimerContext } from '../App';

const SoundPlayer: React.FC = () => {
  const [correctSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/correct.mp3"));
  const [wrongSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/wrong.mp3"));
  const [successSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/success.mp3"));
  const soundDict: Array<{key: string, sound: HTMLAudioElement}> = [
    { key: 'correct', sound: correctSound },
    { key: 'wrong',   sound: wrongSound },
    { key: 'success', sound: successSound },
  ];
  const msgPrefix = 'sound-';
  const userId = useContext(TimerContext).userId;
  const refUserId = useRef(userId)
  const volume = useContext(TimerContext).volume;

  useEffect(() => {
    refUserId.current = userId;
  }, [userId])

  useEffect(() => {
    correctSound.volume = volume * 0.01;
    wrongSound.volume = volume * 0.01;
    successSound.volume = volume * 0.01;
  }, [volume])

  useEffect(() => {
    connection.addOnMessage((response) => {
      const msg: string = response.data;
      soundDict.forEach(item => {
        if (msg.startsWith(msgPrefix + item.key)) {
          if (!msg.endsWith(refUserId.current)) {
            item.sound.play();
          }
        }
      })
    });
  })

  useEffect(() => {
    document.body.addEventListener('keydown',
      (event) => {
        if (event.key === ',') {
          correctSound.play();
          sendCorrectSound();
        }
        if (event.key === '.') {
          wrongSound.play();
          sendWrongSound();
        }
        if (event.key === '/') {
          successSound.play();
          sendSuccessSound();
        }
      }
    );
  }, []);

  const sendCorrectSound = () => {
    connection.send(msgPrefix + 'correct:' + refUserId.current);
  }

  const sendWrongSound = () => {
    connection.send(msgPrefix + 'wrong:' + refUserId.current);
  }

  const sendSuccessSound = () => {
    connection.send(msgPrefix + 'success:' + refUserId.current);
  }

  return (
    <div>
      <Box mt={3}>
        <Grid container justify="center">
          <IconButton onClick={() => {correctSound.play();sendCorrectSound()}}><RadioButtonUncheckedIcon></RadioButtonUncheckedIcon></IconButton>
          <IconButton onClick={() => {wrongSound.play();sendWrongSound()}}><ClearIcon></ClearIcon></IconButton>
          <IconButton onClick={() => {successSound.play();sendSuccessSound()}}><NotificationsActiveIcon></NotificationsActiveIcon></IconButton>
        </Grid>
      </Box>
    </div>
  );

}

export default SoundPlayer;
