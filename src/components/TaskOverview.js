import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';

import PercentageDisplay from './PercentageDisplay';

const Container = styled.div`
  height: auto;
  background: rgba(252, 252, 252, 1);
  box-shadow: 2px 2px 2px rgba(211, 211, 211, 1);
  border: solid .5px rgba(191, 191, 191, 1);
  border-radius: .5rem;
  padding: .5rem;
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const propTypes = {
  subtasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class TaskOverview extends React.Component {
  totalTimeSpent() {
    const { subtasks } = this.props;
    return subtasks.map(t => t.timeSpent).reduce((a, b) => a + b, 0) || 0;
  }

  render() {
    const { subtasks } = this.props;
    return (
      <Container>
        <div>
          <small>Total Time Spent</small>
          <p>{prettyMS(this.totalTimeSpent())}</p>
        </div>
        <div>
          <small>Total Percentage Complete</small>
          <PercentageDisplay tasks={subtasks} />
        </div>
      </Container>
    );
  }
}

TaskOverview.propTypes = propTypes;

export default TaskOverview;
