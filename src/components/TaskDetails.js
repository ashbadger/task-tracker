import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import TaskOverview from './TaskOverview';
import TextArea from './TextArea';
import TaskInput from './TaskInput';
import BackButton from './BackButton';
import { getTask } from '../services/tasks';

const Content = styled.div`
  margin-left: 1.5rem;
  padding: 0 1rem;
  overflow: hidden auto;
  height: -webkit-fill-available;
`;

const SectionHeader = styled.h4`
  font-weight: 500;
  color: rgba(91, 91, 91, 1);
`;

class TaskDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      task: {
        id: this.props.match.params.id,
        name: '',
        subtasks: [{}],
        notes: '',
      }
    };
  }

  componentDidMount() {
    getTask(this.props.match.params.id).then(task => this.setState({ task }))
  };

  openSubtask = (taskId, subtaskId) => {
    return this.props.history.push(`/tasks/${taskId}/${subtaskId}`);
  };

  render() {
    return (
      <div>
        <BackButton history={this.props.history}/>
        <Content>
          <SectionHeader>name</SectionHeader>
          <TaskInput value={this.state.task.name} onChange={() => null}></TaskInput>
          <SectionHeader>overview</SectionHeader>
          <TaskOverview subtasks={this.state.task.subtasks} />
          <SectionHeader>subtasks</SectionHeader>
          { this.state.task.subtasks.map((subtask) => 
              <div onClick={() => this.openSubtask(this.state.task.id, subtask.id)}>
                <Task { ...subtask } key={subtask.id} />
              </div>
            )
          }
          <SectionHeader>notes</SectionHeader>
          <TextArea></TextArea>
        </Content>
      </div>
    );
  }
}

export default TaskDetails;

  /* pointer-events: none; */
  /* opacity: 0.5; */
  // z-index: 1;


// const transformations = {
//   // 'taskList': 'translateX(200%)',
//   // 'subtaskDetails': 'translateX(-200%)',
//   // 'taskDetails': 'none'
// }

// const Container = styled.div`
//   // transform: ${props => transformations[props.activeCard]};
//   // transform: ${props => !props.loaded ? 'translateX(200%)' : 'none'};
//   // transition-duration: 1s;
//   // position: absolute;
//   // width: inherit;
// `;