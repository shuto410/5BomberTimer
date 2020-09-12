import React, { useState, useEffect, createContext, useRef } from 'react';
import { makeStyles, Grid, Slider, Box } from '@material-ui/core'
import Timer from './components/Timer';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import SoundPlayer from './components/SoundPlayer';
import Chat from './components/Chat';
import Fingerprint2 from 'fingerprintjs2';

const useStyles = makeStyles({
  app: {
    padding: '2vh',
  },
})

export const TimerContext = createContext({
  userId: '0',
  volume: 50,
});

const App: React.FC = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState(Math.random().toString());
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    setTimeout(() => {
      Fingerprint2.getV18((hash, components) => {
        setUserId(hash);
      })
    }, 500)
  }, [])

  const volumeChange = (event: any, newValue: number | number[]) => {
    setVolume(newValue as number);
    console.log(volume);
  }

  return (
    <div className={classes.app}>
      <TimerContext.Provider value={{userId: userId, volume: volume}}>
        <Timer/ >
        <SoundPlayer/ >
        <Box mt={0} mb={0}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs={3}>
              <Slider value={volume} onChange={volumeChange} aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
        </Box>
        <Chat/ >
      </TimerContext.Provider>
    </div>
  );
}

export default App;
