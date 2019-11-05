import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';

import Button from './Button';

const TimerBox = styled.p`
  border: ${props =>
    `solid ${props.isActive ? '2px' : '1px'} rgb(195, 195, 195);`};
  border-radius: 5px;
  padding: 6px;
  width: 150px;
`;

const propTypes = {
  timeSpent: PropTypes.number,
  updateTimeSpentHandler: PropTypes.func.isRequired,
  watchTimerStopHandler: PropTypes.func.isRequired,
};

const defaultProps = {
  timeSpent: 0,
};

const Timer = props => {
  const { updateTimeSpentHandler, watchTimerStopHandler, timeSpent } = props;
  const [isActive, setIsActive] = useState(false);
  const [timeInterval, setTimeInterval] = useState();
  const timeSpentRef = useRef(timeSpent);
  timeSpentRef.current = timeSpent;

  const incrementTimeBySecond = () => {
    setIsActive(true);

    setTimeInterval(
      setInterval(() => {
        updateTimeSpentHandler(timeSpentRef.current + 1000);
      }, 1000)
    );
  };

  const stopTimeIncrement = () => {
    clearInterval(timeInterval);
    setIsActive(false);
    watchTimerStopHandler();
  };

  return (
    <div>
      <TimerBox aria-label="time spent" isActive={isActive}>
        {prettyMS(timeSpent)}
      </TimerBox>
      {isActive ? (
        <Button color="red" onClick={stopTimeIncrement}>
          stop
        </Button>
      ) : (
        <Button color="blue" onClick={incrementTimeBySecond}>
          start
        </Button>
      )}
    </div>
  );
};

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
