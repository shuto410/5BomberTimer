import React from 'react';
import { Paper, Typography } from '@material-ui/core'
import 'fontsource-roboto'

type TimeProps = {
  seconds: number;    
  isResetState: boolean;
}
const Time: React.FC<TimeProps> = (props) => {
  const secondsToString = (seconds: number): string => {
    const m: number = Math.floor(seconds / 60);
    const s: number = seconds % 60;
    let mStr: string = m.toString();
    let sStr: string = s.toString();
    if (m < 10) mStr = '0' + mStr;
    if (s < 10) sStr = '0' + sStr;
    return mStr + ':' + sStr;
  }

  return (
      <Typography align="center" color={props.isResetState ? "secondary":"primary"} variant="h1">
        { secondsToString(props.seconds) }
      </Typography>
  );

}

export default Time;