import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskList from '../shared/TaskList';
import Button from '../shared/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
`;

const List = styled.div`
  display: flex;
  overflow-y: scroll;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const propTypes = {
  history: PropTypes.shape({}).isRequired,
};

const TaskListPage = (props) => {
  const { history } = props;

  return (
    <Container>
      <ButtonContainer>
        <b>task tracker</b>
        <Button color="default" onClick={() => history.push('/tasks/create')}>Create New Task</Button>
      </ButtonContainer>
      <List><TaskList history={history} /></List>
    </Container>
  );
};

TaskListPage.propTypes = propTypes;

export default TaskListPage;
