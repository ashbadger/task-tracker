import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';

const Container = styled.div`
  height: 4rem;
  background: rgba(252, 252, 252, 1);
  box-shadow: 2px 2px 2px rgba(211, 211, 211, 1);
  border: solid .5px rgba(191, 191, 191, 1);
  border-radius: 5px;
  padding: .5rem;
  margin-bottom: .5rem;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-areas: 
    'name name name time time'
    'name name name complete complete';

  &:hover {
    background: rgba(235, 235, 235, 1);
    cursor: pointer;
  };

  transition: background 300ms ease 0s;

  small.heading {
    color: rgba(103, 113, 125, 1);
    font-weight: 600;
    margin-right: .5rem;
  }
`;

const Name = styled.div`
  grid-area: name;
`;

const TimeSpent = styled.div`
  grid-area: time;
`;

const Complete = styled.div`
  grid-area: complete;
`;

class Task extends React.Component {
  constructor(props) {
    super(props);
  };

  getAggregatePercentage() {
    const subtasks = this.props.subtasks;
    return (subtasks.filter(t => t.complete).length / subtasks.length).toFixed(2) * 100 || 0;
  }

  render() {
    return (
      <Container>
        <Name>
          <small className="heading">Name</small>
          <p>{this.props.name}</p>
        </Name>
        <TimeSpent>
          <small className="heading">Time Spent </small>
          <small>{prettyMS((this.props.timeSpent || 0))}</small>
        </TimeSpent>
        <Complete>
          {
            this.props.subtasks ?
            <div>
              <small className="heading">Percentage</small>
              <small>{this.getAggregatePercentage()}%</small>
            </div> :
            <div>
              <small className="heading">Completed</small>
              <small>{this.props.complete ? 'Yes' : 'No'}</small>
            </div>
          }
        </Complete>
      </Container>
    );
  };
};

export default Task;