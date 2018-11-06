import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';

import Button from './Button';

const TimerBox = styled.p`
  border: ${props => (props.started ? 'solid 1px rgba(13, 128, 13, 1);' : 'solid 1px transparent;')};
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(128, 128, 128, 1);
  padding: 6px;
  width: 150px;
`;

const propTypes = {
  time: PropTypes.number,
  updateTimeSpentHandler: PropTypes.func.isRequired,
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

    this.interval = setInterval(() => {
      const { time } = this.props;
      this.setState(() => ({ started: true }));
      updateTimeSpentHandler(time + 1000);
    }, 1000);
  };

  stopTimeIncrement = () => {
    clearInterval(this.interval);
    this.setState(() => ({ started: false }));
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
