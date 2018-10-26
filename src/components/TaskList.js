import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import { getTasks } from '../services/tasks';

const Tasks = styled.div`
  overflow: hidden auto;
  height: -webkit-fill-available;
`;

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  componentDidMount() {
      getTasks().then(tasks => this.setState({ tasks }));
  };

  openTask = (id) => {
    this.props.history.push(`/tasks/${id}`);
  };
  
  render() {
    return (
        <Tasks>
          {this.state.tasks.map((task) => 
            <div onClick={() => this.openTask(task.id)}>
              <Task { ...task } key={task.id} />
            </div>
          )}
        </Tasks>
    );
  }
}

export default TaskList;
