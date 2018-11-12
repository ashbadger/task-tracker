import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import TaskService from '../../services/tasks';

const Tasks = styled.div`
  height: 70vh;
  overflow: hidden auto;
`;

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.taskService = new TaskService();
  }

  componentDidMount() {
    this.taskService.getTasks().then(tasks => this.setState({ tasks }));
  }

  openTask = (id) => {
    const { history } = this.props;
    history.push(`/tasks/${id}`);
  };

  render() {
    const { tasks } = this.state;
    return (
      <Tasks>
        {tasks.map(task => (
          <div onClick={() => this.openTask(task.id)}>
            <Task {...task} key={task.id} />
          </div>
        ))}
      </Tasks>
    );
  }
}

export default TaskList;
