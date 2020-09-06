import React from 'react';
import { makeStyles } from '@material-ui/core'
import Timer from './components/Timer';

const useStyles = makeStyles({
  app: {
    padding: '2vh',
  },
})

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Timer/ >
    </div>
  );
}

export default App;
