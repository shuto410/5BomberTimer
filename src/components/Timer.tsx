import React, { useState, useEffect } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core'
import 'fontsource-roboto'
import Time from './Time';

const useStyles = makeStyles({
  button: {
    margin: '1vh',
  }
})

const Timer: React.FC = () => {
  const classes = useStyles();
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Time seconds={remainingSeconds}/ >
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Button size="large" variant="contained" color="primary" className={classes.button}>Start</Button>
          <Button size="large" variant="contained" color="secondary" className={classes.button}>Reset</Button>
        </Grid>
      </Grid>
    </Grid>
  );

}

export default Timer;