import React, { useEffect } from 'react';
import { Grid, IconButton, Box } from '@material-ui/core'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ClearIcon from '@material-ui/icons/Clear';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import 'fontsource-roboto'

const SoundPlayer: React.FC = () => {
  const [correctSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/correct.mp3"));
  const [wrongSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/wrong.mp3"));
  const [successSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/success.mp3"));
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
          <IconButton onClick={() => successSound.play()}><NotificationsActiveIcon></NotificationsActiveIcon></IconButton>
        </Grid>
      </Box>
    </div>
  );

}

export default SoundPlayer;
