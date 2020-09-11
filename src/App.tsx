import React, { useState, useEffect, createContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core'
import Timer from './components/Timer';
import SoundPlayer from './components/SoundPlayer';
import Chat from './components/Chat';
import Fingerprint2 from 'fingerprintjs2';

const useStyles = makeStyles({
  app: {
    padding: '2vh',
  },
})

export const UserContext = createContext('0');

const App: React.FC = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState(Math.random().toString());

  useEffect(() => {
    setTimeout(() => {
      Fingerprint2.getV18((hash, components) => {
        setUserId(hash);
      })
    }, 500)
  }, [])


  return (
    <div className={classes.app}>
      <UserContext.Provider value={userId}>
        <Timer/ >
        <SoundPlayer/ >
        <Chat/ >
      </UserContext.Provider>
    </div>
  );
}

export default App;
