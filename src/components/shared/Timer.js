import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';

import Button from './Button';

const TimerBox = styled.p`
  border: ${props => `solid ${props.started ? '2px' : '1px'} rgb(195, 195, 195);`};
  border-radius: 5px;
  padding: 6px;
  width: 150px;
`;

const propTypes = {
  time: PropTypes.number,
  updateTimeSpentHandler: PropTypes.func.isRequired,
  watchTimerStopHandler: PropTypes.func.isRequired,
};

const defaultProps = {
  time: 0,
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
    };
  }

  incrementTimeBySecond = () => {
    const { updateTimeSpentHandler } = this.props;

    this.setState(() => ({ started: true }));

    this.interval = setInterval(() => {
      const { time } = this.props;
      updateTimeSpentHandler(time + 1000);
    }, 1000);
  };

  stopTimeIncrement = () => {
    const { watchTimerStopHandler } = this.props;

    clearInterval(this.interval);
    this.setState(() => ({ started: false }));

    watchTimerStopHandler();
  };

  render() {
    const { started } = this.state;
    const { time } = this.props;

    return (
      <div>
        <TimerBox started={started}>{prettyMS(time)}</TimerBox>
        {
          started
            ? <Button color="red" onClick={this.stopTimeIncrement}>stop</Button>
            : <Button color="blue" onClick={this.incrementTimeBySecond}>start</Button>
        }
      </div>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
