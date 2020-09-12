import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Grid, IconButton, Paper, Box, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import 'fontsource-roboto'
import Time from './Time';
import { connection } from './WebSocketConnection';
import { TimerContext } from '../App';

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
  const refInitialSeconds = useRef(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const refRemainingSeconds = useRef(remainingSeconds);
  const [timerId, setTimerId] = useState(0);
  const refTimerId = useRef(timerId);
  const [running, setRunning] = useState(false);
  const startButton = {color: 'primary', name: 'start'} as const;
  const stopButton = {color: 'default', name: 'stop'} as const;
  type ActionButton = typeof stopButton | typeof startButton;
  const [actionButton, setActionButton] = useState<ActionButton>({color: 'primary', name: 'start'})
  const [resetButtonIsEnable, setResetButtonIsEnable] = useState(true);
  const [isResetState, setIsResetState] = useState(true);
  const [startSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/start.mp3"));
  const [cannonSound] = React.useState(new Audio("https://raw.githubusercontent.com/shuto410/5BomberTimer/master/audio/cannon.mp3"));
  const userId = useContext(TimerContext).userId;
  const refUserId = useRef(userId)
  const volume = useContext(TimerContext).volume;
  const timerMsgPrefix = 'timer-';

  useEffect(() => {
    refRemainingSeconds.current = remainingSeconds;
    if (remainingSeconds === 0) {
      cannonSound.play();
      window.clearInterval(refTimerId.current);
    }
  }, [remainingSeconds]);

  useEffect(() => {
    refUserId.current = userId;
  }, [userId])

  useEffect(() => {
    startSound.volume = volume * 0.01;
    cannonSound.volume = volume * 0.01;
  }, [volume])

  useEffect(() => {
    refInitialSeconds.current = initialSeconds;
  }, [initialSeconds])

  useEffect(() => {
    refTimerId.current = timerId;
  }, [timerId])

  useEffect(() => {
    connection.addOnMessage((response) => {
      console.log("addOnMessage")
      const data: string = response.data;
      console.log(data)
      if (data.split(':')[1] === refUserId.current) return;
      if (data.startsWith('timer-start')) {
        startTimer();
      }
      if (data.startsWith('timer-stop')) {
        stopTimer();
      }
      if (data.startsWith('timer-reset')) {
        resetTimer();
      }
      if (data.startsWith('timer-increase')) {
        increaseTime();
      }
      if (data.startsWith('timer-decrease')) {
        decreaseTime();
      }
      if (data.startsWith('timer-sync')) {
        console.log('recieve timer sync');
        const msg = data.split(':')[2];
        setRemainingSeconds(parseInt(msg.split('-')[0]))
        setInitialSeconds(parseInt(msg.split('-')[1]))
        if (msg.split('-')[2] === 'true') {
          startTimer();
        }
        else {
          stopTimer();
          if (refRemainingSeconds.current === refInitialSeconds.current) {
            setIsResetState(true);
          }
          else {
            setIsResetState(false);
          }
        }
      }
    })
  }, [])

  const onActionButton = () => {
    syncTimer();
    if (running) {
      stopTimer();
      connection.send(timerMsgPrefix + 'stop:' + refUserId.current);
    }
    else {
      startTimer();
      connection.send(timerMsgPrefix + 'start:' + refUserId.current);
    }
  }

  const onClickResetButton  = () => {
    syncTimer();
    resetTimer();
    connection.send(timerMsgPrefix + 'reset:' + refUserId.current);
  }
  const onClickIncreaseButton  = () => {
    syncTimer();
    increaseTime();
    connection.send(timerMsgPrefix + 'increase:' + refUserId.current);
  }
  const onClickDecreaseButton  = () => {
    syncTimer();
    decreaseTime();
    connection.send(timerMsgPrefix + 'decrease:' + refUserId.current);
  }

  const syncTimer = () => {
    const msg: string = ':' + refRemainingSeconds.current + '-' + refInitialSeconds.current + '-' + running.toString();
    connection.send(timerMsgPrefix + 'sync:' + refUserId.current + msg);
  }

  const startTimer = () => {
    console.log("startTimer");
    window.clearInterval(refTimerId.current);
    setTimerId(window.setInterval(updateTimer, 1000));
    if (refRemainingSeconds.current === refInitialSeconds.current) {
      // console.log("remainingSeconds" + remainingSeconds)
      startSound.play();
    }
    setRunning(true);
    setActionButton(stopButton);
    setResetButtonIsEnable(false);
    setIsResetState(false);
  }

  const stopTimer = () => {
    window.clearInterval(refTimerId.current);
    setRunning(false);
    setActionButton(startButton);
    setResetButtonIsEnable(true);
  }

  const updateTimer = () => {
    if (refRemainingSeconds.current > 0) {
      setRemainingSeconds(refRemainingSeconds.current - 1);
    }
  }

  const resetTimer = () => {
    setRemainingSeconds(refInitialSeconds.current);
    window.clearInterval(refTimerId.current);
    setIsResetState(true);
  }

  const increaseTime = () => {
    if (isResetState) {
      if (refInitialSeconds.current > 3570) {
        setInitialSeconds(3599);
      }
      else {
        setInitialSeconds(refInitialSeconds.current + 30);
      }
    }
    if (refRemainingSeconds.current > 3570) {
      setRemainingSeconds(3599);
      return;
    }
    setRemainingSeconds(refRemainingSeconds.current + 30);
  }

  const decreaseTime = () => {
    if (isResetState) {
      if (refInitialSeconds.current < 30) {
        setInitialSeconds(0);
      }
      else {
        setInitialSeconds(refInitialSeconds.current - 30)
      }
    }
    if (refRemainingSeconds.current < 30) {
      setRemainingSeconds(0);
      return;
    }
    setRemainingSeconds(refRemainingSeconds.current - 30);
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
              <Box mt={1}><IconButton color={isResetState ? "secondary":"primary"} edge='start' onClick={() => {onClickIncreaseButton()}}><AddIcon></AddIcon></IconButton></Box>
            </Grid>
            <Grid item xs={12}>
              <IconButton color={isResetState ? "secondary":"primary"} edge='start' onClick={() => {onClickDecreaseButton()}}><RemoveIcon></RemoveIcon></IconButton>
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
            <Button size="large" variant="contained" color="secondary" startIcon={<StopIcon/>} disabled={resetButtonIsEnable ? false : true} onClick={() => {onClickResetButton()}}>Reset</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );

}

export default Timer;