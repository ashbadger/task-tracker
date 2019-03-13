import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';

import PercentageDisplay from './PercentageDisplay';

const Container = styled.div`
  border: solid 1px rgb(222, 222, 222);
  border-radius: .5rem;
  display: flex;
  flex-wrap: wrap;
  height: auto;
  justify-content: space-evenly;
  margin-bottom: .5rem;
  padding: .5rem;
  text-align: center;
`;

const propTypes = {
  timeSpent: PropTypes.number.isRequired,
  percentageComplete: PropTypes.number.isRequired,
};

const TaskOverview = (props) => {
  const { timeSpent, percentageComplete } = props;

  return (
    <Container>
      <div>
        <small>Total Time Spent</small>
        <p>{prettyMS(timeSpent)}</p>
      </div>
      <div>
        <small>Total Percentage Complete</small>
        <PercentageDisplay percentage={percentageComplete} />
      </div>
    </Container>
  );
};

TaskOverview.propTypes = propTypes;

export default TaskOverview;
