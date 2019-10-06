import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Task from './Task';
import TaskService from '../../services/tasks';

const Container = styled.div`
  height: -webkit-fill-available;
`;

const Tasks = styled.div`
  width: -webkit-fill-available;
`;

const propTypes = {
  history: PropTypes.shape(History).isRequired,
};

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.taskService = new TaskService();
  }

  async componentDidMount() {
    const tasks = await this.taskService.getTasks();
    this.setState({ tasks });
  }

  openTask = id => {
    const { history } = this.props;
    history.push(`/tasks/${id}`);
  };

  render() {
    const { tasks } = this.state;

    return tasks ? (
      <Tasks data-testid="task-list">
        {tasks.map(task => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => this.openTask(task.id)}
            onKeyDown={() => this.openTask(task.id)}
            key={task.id}
          >
            <Task
              name={task.name}
              completed={task.completed}
              subtasks={task.subtasks}
            />
          </div>
        ))}
      </Tasks>
    ) : (
      <Container />
    );
  }
}

TaskList.propTypes = propTypes;

export default TaskList;
