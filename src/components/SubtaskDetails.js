import React from 'react';
import styled from 'styled-components';

import TaskInput from './TaskInput';
import TextArea from './TextArea';
import Timer from './Timer';
import Button from './Button';
import BackButton from './BackButton';
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
  padding: 1rem 3rem;
  border: solid 1px rgba(211, 211, 211, 1);
  border-radius: 5px;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SectionHeader = styled.h4`
  font-weight: 500;
  color: rgba(91, 91, 91, 1);
`;

class SubtaskDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      subtask: {
        id: 0,
        name: '',
        notes: '',
        timeSpent: 0
      }
    };
  };

  componentDidMount() {
    getSubtask(this.props.match.params.id, this.props.match.params.subtaskId)
      .then(subtask => this.setState({ subtask }) );
  };

  render() {
    return (
      <div>
        <BackButton history={this.props.history}/>
        <Content>
          <SectionHeader>name</SectionHeader>
          <TaskInput value={this.state.subtask.name} onChange={() => null}></TaskInput>
          <SectionHeader>actions</SectionHeader>
          <ActionsContainer>
            <ItemContainer>
              <small>Time Spent</small>
              <Timer time={this.state.subtask.timeSpent}/>
            </ItemContainer>
            <ItemContainer>
              <small>Complete Subtask</small>
              <Button color='green'>Complete</Button>
            </ItemContainer>
            <ItemContainer>
              <small>Delete Subtask</small>
              <Button color='red'>delete</Button>
            </ItemContainer>
          </ActionsContainer>
          <SectionHeader>notes</SectionHeader>
          <TextArea></TextArea>
        </Content> 
      </div>
    );
  }
}

export default SubtaskDetails;