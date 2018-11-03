import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TaskInput from './TaskInput';
import TextArea from './TextArea';
import Timer from './Timer';
import Button from './Button';
import { getSubtask } from '../services/tasks';

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
      subtask: {
        id: 0,
        name: '',
        notes: '',
        timeSpent: 0,
      },
    };
  }

  componentDidMount() {
    const { match: { params: { id: taskId, subtaskId } } } = this.props;
    getSubtask(taskId, subtaskId)
      .then(subtask => this.setState({ subtask }));
  }

  // TODO: create "updateSubtask"

  // TODO: create "deleteSubtask"

  render() {
    const { subtask: { timeSpent, name } } = this.state;
    return (
      <Content>
        <SectionHeader>name</SectionHeader>
        <TaskInput value={name} onChange={() => null} />
        <SectionHeader>actions</SectionHeader>
        <ActionsContainer>
          <ItemContainer>
            <small>Time Spent</small>
            <Timer time={timeSpent} />
          </ItemContainer>
          <ItemContainer>
            <small>Complete Subtask</small>
            <Button color="green">Complete</Button>
          </ItemContainer>
          <ItemContainer>
            <small>Delete Subtask</small>
            <Button color="red">delete</Button>
          </ItemContainer>
        </ActionsContainer>
        <SectionHeader>notes</SectionHeader>
        <TextArea />
      </Content>
    );
  }
}

SubtaskDetails.propTypes = propTypes;

export default SubtaskDetails;
