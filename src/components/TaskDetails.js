import React from 'react';
import styled from 'styled-components';

import Task from './Task';
import TaskOverview from './TaskOverview';
import TextArea from './TextArea';
import TaskInput from './TaskInput';
import TaskService from '../services/tasks';
import AddButton from './AddButton';
import getSubtasksAggs from '../utils/getSubtasksAggs';

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
      id,
      name: '',
      subtasks: [{}],
      notes: '',
      percentageCompleteAgg: 0,
      timeSpentAgg: 0,
    };

    this.taskService = new TaskService();
  }

  componentDidMount() {
    const { id } = this.state;
    this.taskService.getTask(id).then((task) => {
      const aggregates = getSubtasksAggs(task.subtasks);
      this.setState({ ...task, ...aggregates });
    });
  }

  openSubtask = (subtaskId) => {
    const { history } = this.props;
    const { id } = this.state;

    history.push(`/tasks/${id}/${subtaskId}`);
  }

  createSubtask = async (subtask) => {
    const { id } = this.state;
    const subtaskDocument = await this.taskService.createSubtask(id, subtask);
    this.setState((prevState) => {
      const { subtasks } = prevState;
      return { subtasks: [...subtasks, subtaskDocument] };
    });
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  }

  render() {
    const {
      name, subtasks, notes, percentageCompleteAgg, timeSpentAgg,
    } = this.state;

    const subtask = {
      name: 'create more subtasks!',
      completed: false,
      timeSpent: 12000,
    };

    // TODO: remove button used for generating fixture data

    return (
      <Content>
        <button type="button" onClick={() => this.createSubtask(subtask)}>add some!!</button>
        <SectionHeader>name</SectionHeader>
        <TaskInput value={name} onChange={this.onNameChange} />
        <SectionHeader>overview</SectionHeader>
        <TaskOverview timeSpent={timeSpentAgg} percentageComplete={percentageCompleteAgg} />
        <SectionHeader>subtasks</SectionHeader>
        {subtasks.map(subtask => (
          <div onClick={() => this.openSubtask(subtask.id)}>
            <Task {...subtask} isSubtask key={subtask.id} />
          </div>
        ))}
        <AddButton color="green">Add Subtask</AddButton>
        <SectionHeader>notes</SectionHeader>
        <TextArea value={notes} onChange={this.onNotesChange} />
      </Content>
    );
  }
}

export default TaskDetails;
