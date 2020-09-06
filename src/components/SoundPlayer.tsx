import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, IconButton, Paper, Box, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import PauseIcon from '@material-ui/icons/Pause';
import 'fontsource-roboto'
import Time from './Time';

const SoundPlayer: React.FC = () => {
  const [audio] = React.useState(new Audio("../../audio/correct.mp3"));
  return (
    <div>
      <Button onClick={() => audio.play()}>Correct</Button>
    </div>
  );

}

export default SoundPlayer;
