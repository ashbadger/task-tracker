import React from 'react';

import TaskOverview from '../shared/TaskOverview';
import TaskService from '../../services/tasks';
import Task from '../shared/Task';
import TextArea from '../shared/TextArea';
import TaskNameInput from '../shared/TaskNameInput';
import FullWidthButton from '../shared/FullWidthButton';
import getSubtasksAggs from '../../utils/getSubtasksAggs';
import SectionHeader from '../shared/SectionHeader';
import ContentContainer from '../shared/ContentContainer';
import { navigateBack } from '../../routers/AppRouter';

class TaskDetails extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    this.state = {
      id,
      name: '',
      subtasks: [],
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

  async componentWillUnmount() {
    await this.saveTask();
  }

  openSubtask = (subtaskId) => {
    const { history } = this.props;
    const { id } = this.state;

    history.push(`/tasks/${id}/${subtaskId}`);
  }

  saveTask = () => {
    const { id, ...subtask } = this.state;
    this.taskService.updateTask(id, subtask).catch(() => console.log('task does not exist'));
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

    this.taskService.deleteTask(id).then(() => navigateBack(history));
  }

  onNameChangeHandler = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onMouseLeaveHandler = async () => {
    await this.saveTask();
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
      <ContentContainer>
        <TaskNameInput
          name={name}
          onNameChangeHandler={this.onNameChangeHandler}
          onMouseLeaveHandler={this.onMouseLeaveHandler}
        />
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
        <SectionHeader>delete task</SectionHeader>
        <FullWidthButton color="red" onClick={() => this.deleteTask()}>Delete Task</FullWidthButton>
      </ContentContainer>
    );
  }
}

export default TaskDetails;
