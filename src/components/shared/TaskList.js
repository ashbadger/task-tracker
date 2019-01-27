import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import TaskService from '../../services/tasks';

const Container = styled.div`
  height: -webkit-fill-available;
`;

const Tasks = styled.div`
  overflow-y: scroll;
  width: -webkit-fill-available;

  @media screen and (max-width: 767px) {
    -webkit-overflow-scrolling: touch;
  }
`;

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

    return (tasks
      ? (
        <Tasks>
          {tasks.map(task => (
            <div onClick={() => this.openTask(task.id)}>
              <Task {...task} key={task.id} />
            </div>
          ))}
        </Tasks>)
      : (<Container />)
    );
  }
}

export default TaskList;
