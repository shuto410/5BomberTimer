import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, IconButton, Paper, Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import 'fontsource-roboto'
import Time from './Time';


const Timer: React.FC = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const refRemainingSeconds = useRef(remainingSeconds);
  const [timerId, setTimerId] = useState(0);
  const [running, setRunning] = useState(false);
  const startButton = {color: 'primary', name: 'start'} as const;
  const stopButton = {color: 'default', name: 'stop'} as const;
  type ActionButton = typeof stopButton | typeof startButton;
  const [actionButton, setActionButton] = useState<ActionButton>({color: 'primary', name: 'start'})
  const [resetButtonIsEnable, setResetButtonIsEnable] = useState(true);

  useEffect(() => {
    refRemainingSeconds.current = remainingSeconds;
    if (remainingSeconds === 0) {
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
    }
  }

  const startTimer = () => {
    setTimerId(window.setInterval(updateTimer, 1000));
  }

  const stopTimer = () => {
    window.clearInterval(timerId);
  }

  const updateTimer = () => {
    setRemainingSeconds(refRemainingSeconds.current - 1);
  }

  const resetTimer = () => {
    setRemainingSeconds(3);
    window.clearInterval(timerId);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <Paper elevation={4}>
          <Grid container>
            <Grid item xs={11}>
              <Box ml="8vw">
                <Time seconds={remainingSeconds}/ >
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Grid container>
                <Grid item xs={12}>
                  <Box mt={1}>
                    <IconButton color="primary" edge='start'><AddIcon></AddIcon></IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <IconButton color="primary" edge='start'><RemoveIcon></RemoveIcon></IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Box mr="1vw" mt="3vh">
            <Button size="large" variant="contained" color={actionButton.color} onClick={() => {onActionButton()}}>{actionButton.name}</Button>
          </Box>
          <Box ml="1vw" mt="3vh">
            <Button size="large" variant="contained" color="secondary" disabled={resetButtonIsEnable ? false : true} onClick={() => {resetTimer()}}>Reset</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );

}

export default Timer;