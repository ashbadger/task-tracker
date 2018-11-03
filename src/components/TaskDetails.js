import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import TaskOverview from './TaskOverview';
import TextArea from './TextArea';
import TaskInput from './TaskInput';
import { getTask } from '../services/tasks';

const Content = styled.div`
  height: -webkit-fill-available;
  margin-left: 1.5rem;
  overflow: hidden auto;
  padding: 0 1rem;
`;

const SectionHeader = styled.h4`
  color: rgba(91, 91, 91, 1);
  font-weight: 500;
`;

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    this.state = {
      task: {
        id,
        name: '',
        subtasks: [{}],
        notes: '',
      },
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getTask(id).then(task => this.setState({ task }));
  }

  openSubtask = (taskId, subtaskId) => {
    const { history } = this.props;
    history.push(`/tasks/${taskId}/${subtaskId}`);
  }

  render() {
    const { task: { name, subtasks, id } } = this.state;
    return (
      <Content>
        <SectionHeader>name</SectionHeader>
        <TaskInput value={name} onChange={() => null} />
        <SectionHeader>overview</SectionHeader>
        <TaskOverview subtasks={subtasks} />
        <SectionHeader>subtasks</SectionHeader>
        {subtasks.map(subtask => (
          <div onClick={() => this.openSubtask(id, subtask.id)}>
            <Task {...subtask} key={subtask.id} />
          </div>
        ))}
        <SectionHeader>notes</SectionHeader>
        <TextArea />
      </Content>
    );
  }
}

export default TaskDetails;
