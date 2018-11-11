import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TaskInput from '../shared/TaskInput';
import TextArea from '../shared/TextArea';
import Timer from '../shared/Timer';
import Button from '../shared/Button';
import TaskService from '../services/tasks';
import { navigateBack } from '../routers/AppRouter';

const Content = styled.div`
  margin-left: 1.5rem;
  margin-top: 1rem;
  padding: 0 1rem;
  overflow: hidden auto;
  height: -webkit-fill-available;
`;

const ActionsContainer = styled.div`
  height: auto;
  background: rgba(252, 252, 252, 1);
  box-shadow: 2px 2px 2px rgba(211, 211, 211, 1);
  border: solid .5px rgba(191, 191, 191, 1);
  border-radius: 5px;
  padding: .5rem;
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ItemContainer = styled.div`
  text-align: center;
  padding: 1rem 2rem;
  border: solid 1px rgba(211, 211, 211, 1);
  border-radius: 5px;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 116px;
`;

const SectionHeader = styled.h4`
  font-weight: 500;
  color: rgba(91, 91, 91, 1);
`;

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

class SubtaskDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: '',
      completed: false,
      timeSpent: 0,
    };
    this.taskService = new TaskService();
  }

  componentDidMount() {
    this.getSubtask();
  }

  componentWillUnmount() {
    const { ...subtask } = this.state;
    this.updateSubtask(subtask).catch(() => console.log('task does not exist'));
  }

  updateTimeSpentHandler = (time) => {
    this.setState(() => ({ timeSpent: time }));
  }

  watchTimerStopHandler = () => {
    const { ...subtask } = this.state;
    this.updateSubtask(subtask);
  }

  getSubtask = () => {
    const { match: { params: { id: taskId, subtaskId } } } = this.props;
    this.taskService.getSubtask(taskId, subtaskId)
      .then(subtask => this.setState(() => ({ ...subtask })));
  }

  updateAndGetSubtask = (updates) => {
    this.updateSubtask(updates).then(() => this.getSubtask());
  }

  updateSubtask = (updates) => {
    const { match: { params: { id: taskId, subtaskId } } } = this.props;
    return this.taskService.updateSubtask(taskId, subtaskId, updates);
  }

  onNameChangeHandler = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  }

  deleteSubtask = () => {
    const { match: { params: { id: taskId, subtaskId } }, history } = this.props;

    return this.taskService.deleteSubtask(taskId, subtaskId)
      .then(() => {
        navigateBack(history);
      });
  }

  render() {
    const {
      timeSpent, name, notes, completed,
    } = this.state;

    return (
      <Content>
        <TaskInput name={name} onNameChangeHandler={this.onNameChangeHandler} />
        <SectionHeader>actions</SectionHeader>
        <ActionsContainer>
          <ItemContainer>
            <small>Time Spent</small>
            <Timer
              time={timeSpent}
              updateTimeSpentHandler={this.updateTimeSpentHandler}
              watchTimerStopHandler={this.watchTimerStopHandler}
            />
          </ItemContainer>
          <ItemContainer>
            { completed ? (
              <React.Fragment>
                <small>Undo Complete Subtask</small>
                <Button color="red" onClick={() => this.updateAndGetSubtask({ completed: false })}>Undo Complete</Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <small>Complete Subtask</small>
                <Button color="green" onClick={() => this.updateAndGetSubtask({ completed: true })}>Complete</Button>
              </React.Fragment>
            )}
          </ItemContainer>
          <ItemContainer>
            <small>Delete Subtask</small>
            <Button color="red" onClick={() => this.deleteSubtask()}>delete</Button>
          </ItemContainer>
        </ActionsContainer>
        <SectionHeader>notes</SectionHeader>
        <TextArea value={notes} onChange={this.onNotesChange} />
      </Content>
    );
  }
}

SubtaskDetails.propTypes = propTypes;

export default SubtaskDetails;
