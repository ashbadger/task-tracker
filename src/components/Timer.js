import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';

import Button from './Button';

const TimerBox = styled.p`
  border: ${props => (props.started ? 'solid 1px rgba(13, 128, 13, 1);' : 'solid 1px transparent;')};
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(128, 128, 128, 1);
  padding: 6px;
  width: 150px;
`;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      started: false,
    };
  }

  incrementTime = () => {
    this.interval = setInterval(() => {
      this.setState(state => ({ time: state.time + 1000, started: true }));
    }, 1000);
  };

  stopTime = () => {
    clearInterval(this.interval);
    this.setState(() => ({ started: false }));
  };

  render() {
    const { started, time } = this.state;
    return (
      <div>
        <TimerBox started={started}>{prettyMS(time)}</TimerBox>
        {
          started
            ? <Button color="red" onClick={this.stopTime}>stop</Button>
            : <Button color="navy" onClick={this.incrementTime}>start</Button>
        }
      </div>
    );
  }
}

export default Timer;
