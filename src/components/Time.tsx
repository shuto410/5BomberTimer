import React from 'react';
import { Paper, Typography } from '@material-ui/core'
import 'fontsource-roboto'

type TimeProps = {
  seconds: number;    
}
const Time: React.FC<TimeProps> = (props) => {
  const secondsToString = (seconds: number): string => {
    const m: number = seconds / 60;
    const s: number = seconds % 60;
    let mStr: string = m.toString();
    let sStr: string = s.toString();
    if (m < 10) mStr = '0' + mStr;
    if (s < 10) sStr = sStr + '0';
    return mStr + ':' + sStr;
  }

  return (
    <Paper elevation={4}>
      <Typography align="center" color="primary" variant="h1">
        { secondsToString(props.seconds) }
      </Typography>
    </Paper>
  );

}

export default Time;