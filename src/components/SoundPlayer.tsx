import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, IconButton, Paper, Box, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import 'fontsource-roboto'
import Time from './Time';

const SoundPlayer: React.FC = () => {
  const [correctSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/correct.mp3"));
  const [wrongSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/wrong.mp3"));
  useEffect(() => {
    document.body.addEventListener('keydown',
      (event) => {
        if (event.key === 'c') {
          playCorrectSound();
        }
      }
    );
    document.body.addEventListener('keydown',
      (event) => {
        if (event.key === 'x') {
          playWrongSound();
        }
      }
    );
  }, []);

  const playCorrectSound = () => {
    correctSound.play();
    // setTimeout(() => {
    //   correctSound.pause();
    // }, 1000)
  }

  const playWrongSound = () => {
    wrongSound.play();
    // setTimeout(() => {
    //   wrongSound.pause();
    // }, 1000)
  }

  return (
    <div>
      <Box mt={3}>
        <Grid container justify="center">
          <IconButton onClick={() => playCorrectSound()}><RadioButtonUncheckedIcon></RadioButtonUncheckedIcon></IconButton>
          <IconButton onClick={() => playWrongSound()}><ClearIcon></ClearIcon></IconButton>
        </Grid>
      </Box>
    </div>
  );

}

export default SoundPlayer;
