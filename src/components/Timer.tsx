import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, IconButton, Paper, Box, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import 'fontsource-roboto'
import Time from './Time';

const useStyles = makeStyles({
  redBg: {
    background: 'red',
  },
  whiteBg: {
  },
})


const Timer: React.FC = () => {
  const classes = useStyles();
  const [initialSeconds, setInitialSeconds] = useState(90)
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const refRemainingSeconds = useRef(remainingSeconds);
  const [timerId, setTimerId] = useState(0);
  const [running, setRunning] = useState(false);
  const startButton = {color: 'primary', name: 'start'} as const;
  const stopButton = {color: 'default', name: 'stop'} as const;
  type ActionButton = typeof stopButton | typeof startButton;
  const [actionButton, setActionButton] = useState<ActionButton>({color: 'primary', name: 'start'})
  const [resetButtonIsEnable, setResetButtonIsEnable] = useState(true);
  const [isResetState, setIsResetState] = useState(true);
  const [startSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/start.mp3"));
  const [cannonSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/cannon.mp3"));

  useEffect(() => {
    refRemainingSeconds.current = remainingSeconds;
    if (remainingSeconds === 0) {
      cannonSound.play();
      window.clearInterval(timerId);
    }
  }, [remainingSeconds]);

  const onActionButton = () => {
    if (running) {
      stopTimer();
      setRunning(false);
      setActionButton(startButton);
      setResetButtonIsEnable(true);
    }
    else {
      startTimer();
      setRunning(true);
      setActionButton(stopButton);
      setResetButtonIsEnable(false);
      setIsResetState(false);
    }
  }

  const startTimer = () => {
    setTimerId(window.setInterval(updateTimer, 1000));
    if (remainingSeconds === initialSeconds) {
      startSound.play();
    }
  }

  const stopTimer = () => {
    window.clearInterval(timerId);
  }

  const updateTimer = () => {
    if (refRemainingSeconds.current > 0) {
      setRemainingSeconds(refRemainingSeconds.current - 1);
    }
  }

  const resetTimer = () => {
    setRemainingSeconds(initialSeconds);
    window.clearInterval(timerId);
    setIsResetState(true);
  }

  const increaseTime = () => {
    if (isResetState) {
      if (initialSeconds > 3570) {
        setInitialSeconds(3599);
      }
      else {
        setInitialSeconds(initialSeconds + 30);
      }
    }
    if (remainingSeconds > 3570) {
      setRemainingSeconds(3599);
      return;
    }
    setRemainingSeconds(remainingSeconds + 30);
  }

  const decreaseTime = () => {
    if (isResetState) {
      if (initialSeconds < 30) {
        setInitialSeconds(0);
      }
      else {
        setInitialSeconds(initialSeconds - 30)
      }
    }
    if (remainingSeconds < 30) {
      setRemainingSeconds(0);
      return;
    }
    setRemainingSeconds(remainingSeconds - 30);
  }

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs md={5}>
        <Paper className={remainingSeconds === 0 ? classes.redBg : classes.whiteBg} color="primary" elevation={4}>
          <Grid container>
          <Grid item xs={11}>
            <Box ml="5vw"><Time seconds={remainingSeconds} isResetState={isResetState}/ ></Box>
          </Grid>
          <Grid item xs={1}>
            <Grid container>
            <Grid item xs={12}>
              <Box mt={1}><IconButton color={isResetState ? "secondary":"primary"} edge='start' onClick={() => {increaseTime()}}><AddIcon></AddIcon></IconButton></Box>
            </Grid>
            <Grid item xs={12}>
              <IconButton color={isResetState ? "secondary":"primary"} edge='start' onClick={() => {decreaseTime()}}><RemoveIcon></RemoveIcon></IconButton>
            </Grid>
            </Grid>
          </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Box mr="1vw" mt="3vh">
            <Button size="large" variant="contained" color={actionButton.color} startIcon={running ? <PauseIcon/>:<PlayArrowIcon/>} onClick={() => {onActionButton()}}>{actionButton.name}</Button>
          </Box>
          <Box ml="1vw" mt="3vh">
            <Button size="large" variant="contained" color="secondary" startIcon={<StopIcon/>} disabled={resetButtonIsEnable ? false : true} onClick={() => {resetTimer()}}>Reset</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );

}

export default Timer;