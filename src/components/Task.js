import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';

const Container = styled.div`
  background: rgba(252, 252, 252, 1);
  border: solid .5px rgba(191, 191, 191, 1);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(211, 211, 211, 1);
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-areas: 
    'name name name time time'
    'name name name complete complete';
  height: 4rem;
  margin-bottom: .5rem;
  padding: .5rem;
  transition: background 300ms ease 0s;

  &:hover {
    background: rgba(235, 235, 235, 1);
    cursor: pointer;
  };

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

const propTypes = {
  subtasks: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  timeSpent: PropTypes.number,
  complete: PropTypes.bool,
};

const defaultProps = {
  subtasks: [],
  name: '',
  timeSpent: 0,
  complete: false,
};

class Task extends React.Component {
  getAggregatePercentage() {
    const { subtasks } = this.props;
    return (subtasks.filter(t => t.complete).length / subtasks.length).toFixed(2) * 100 || 0;
  }

  render() {
    const {
      name, timeSpent, subtasks, complete,
    } = this.props;

    return (
      <Container>
        <Name>
          <small className="heading">Name</small>
          <p>{name}</p>
        </Name>
        <TimeSpent>
          <small className="heading">Time Spent </small>
          <small>{prettyMS((timeSpent || 0))}</small>
        </TimeSpent>
        <Complete>
          {
            subtasks ? (
              <div>
                <small className="heading">Percentage</small>
                <small>
                  {this.getAggregatePercentage()}
                  %
                </small>
              </div>
            ) : (
              <div>
                <small className="heading">Completed</small>
                <small>{complete ? 'Yes' : 'No'}</small>
              </div>
            )
          }
        </Complete>
      </Container>
    );
  }
}

Task.propTypes = propTypes;
Task.defaultProps = defaultProps;

export default Task;
