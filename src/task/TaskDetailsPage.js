import React from 'react';
import styled from 'styled-components';

import TaskOverview from './TaskOverviewPage';
import TaskService from '../services/tasks';
import Task from '../shared/Task';
import TextArea from '../shared/TextArea';
import TaskInput from '../shared/TaskInput';
import FullWidthButton from '../shared/FullWidthButton';
import getSubtasksAggs from '../utils/getSubtasksAggs';
import SectionHeader from '../shared/SectionHeader';

const Content = styled.div`
  height: -webkit-fill-available;
  margin-left: 1.5rem;
  overflow: hidden auto;
  padding: 0 1rem;
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

  deleteTask = () => {
    const { id } = this.state;
    const { history } = this.props;

    this.taskService.deleteTask(id).then(() => history.push('/tasks'));
  }

  onNameChangeHandler = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  }

  render() {
    const {
      id, name, subtasks, notes, percentageCompleteAgg, timeSpentAgg,
    } = this.state;
    const { history } = this.props;

    return (
      <Content>
        <TaskInput name={name} onNameChangeHandler={this.onNameChangeHandler} />
        <SectionHeader>overview</SectionHeader>
        <TaskOverview timeSpent={timeSpentAgg} percentageComplete={percentageCompleteAgg} />
        <SectionHeader>subtasks</SectionHeader>
        {subtasks.map(subtask => (
          <div onClick={() => this.openSubtask(subtask.id)}>
            <Task {...subtask} isSubtask key={subtask.id} />
          </div>
        ))}
        <FullWidthButton color="green" onClick={() => history.push(`/tasks/${id}/create`)}>Add Subtask</FullWidthButton>
        <SectionHeader>notes</SectionHeader>
        <TextArea value={notes} onChange={this.onNotesChange} />
        <FullWidthButton color="red" onClick={() => this.deleteTask()}>Delete Task</FullWidthButton>
      </Content>
    );
  }
}

export default TaskDetails;
