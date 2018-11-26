import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskList from '../shared/TaskList';
import FullWidthButton from '../shared/FullWidthButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
`;

const List = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Button = styled.div`
  height: 3rem;
`;

const propTypes = {
  history: PropTypes.shape({}).isRequired,
};

const TaskListPage = (props) => {
  const { history } = props;

  return (
    <Container>
      <List><TaskList history={history} /></List>
      <Button><FullWidthButton color="green" onClick={() => history.push('/tasks/create')}>Add Task</FullWidthButton></Button>
    </Container>
  );
};

TaskListPage.propTypes = propTypes;

export default TaskListPage;
