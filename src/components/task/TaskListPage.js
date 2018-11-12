import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskList from '../shared/TaskList';
import FullWidthButton from '../shared/FullWidthButton';

const Container = styled.div`
  margin: 1rem 0;
`;

const propTypes = {
  history: PropTypes.shape({}).isRequired,
};

const TaskListPage = (props) => {
  const { history } = props;

  return (
    <div>
      <TaskList history={history} />
      <Container>
        <FullWidthButton color="green" onClick={() => history.push('/tasks/create')}>Add Task</FullWidthButton>
      </Container>
    </div>
  );
};

TaskListPage.propTypes = propTypes;

export default TaskListPage;
