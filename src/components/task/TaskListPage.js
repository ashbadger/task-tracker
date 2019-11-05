import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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

  @media screen and (max-width: 767px) {
    -webkit-overflow-scrolling: touch;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const TaskListPage = () => {
  const history = useHistory();

  return (
    <Container>
      <ButtonContainer>
        <b>task tracker</b>
        <Button color="default" onClick={() => history.push('/tasks/create')}>
          Create New Task
        </Button>
      </ButtonContainer>
      <List>
        <TaskList />
      </List>
    </Container>
  );
};

export default TaskListPage;
