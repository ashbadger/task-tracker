import React from 'react';
import styled from 'styled-components';
import prettyMS from 'pretty-ms';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import getSubtasksAggs from '../../utils/getSubtasksAggs';

const Container = styled.div`
  border: solid 2px rgb(154, 154, 154);
  border-radius: 5px;
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-areas: 
    'name name name time time'
    'name name name complete complete';
  grid-gap: 0 1rem;
  height: auto;
  margin-bottom: .5rem;
  padding: .5rem;
  transition: background 400ms ease 0s;
  
  &:hover {
    background: rgb(249, 249, 249);
    cursor: pointer;
  };

  small.heading {
    color: rgba(103, 113, 125, 1);
    font-weight: 600;
    margin-right: .5rem;
  }

  &.task-enter {
    opacity: 0.01;
    transform: translateY(-5%);
  }

  &.task-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all 500ms ease-out;
  }

  @media screen and (max-width: 767px) {
    grid-template-areas: 
      'name name name'
      'time time time'
      'complete complete complete';
    p { margin: .5rem 0; }
  }
`;

const Name = styled.div`
  grid-area: name;
  p {
    font-weight: 600;
    color: rgba(76,76,76, 1);
  }
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
  completed: PropTypes.bool,
  isSubtask: PropTypes.bool,
  timeSpent: PropTypes.number,
};

const defaultProps = {
  subtasks: [],
  name: '',
  completed: false,
  isSubtask: false,
  timeSpent: null,
};

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentageCompleteAgg: 0,
      timeSpentAgg: 0,
    };
  }

  componentDidMount() {
    const { isSubtask, subtasks } = this.props;
    const isTask = !isSubtask;

    if (isTask) {
      const aggregates = getSubtasksAggs(subtasks);
      this.setState(() => (aggregates));
    }

    this.setState(() => ({ active: true }));
  }

  render() {
    const {
      name, completed, isSubtask, timeSpent,
    } = this.props;

    const {
      percentageCompleteAgg,
      timeSpentAgg,
      active,
    } = this.state;

    return (
      <CSSTransition in={active} classNames="task" timeout={{ enter: 600, exit: 50 }}>
        <Container className="task">
          <Name>
            <small className="heading">Name</small>
            <p>{name}</p>
          </Name>
          <TimeSpent>
            <small className="heading">Time Spent </small>
            <small>{prettyMS(timeSpentAgg || timeSpent || 0)}</small>
          </TimeSpent>
          <Complete>
            <div>
              <small className="heading">Complete</small>
              {isSubtask ? (
                <small>{completed ? 'Yes' : 'No'}</small>
              ) : (
                <small>
                  {percentageCompleteAgg}
                  %
                </small>
              )}
            </div>
          </Complete>
        </Container>
      </CSSTransition>
    );
  }
}

Task.propTypes = propTypes;
Task.defaultProps = defaultProps;

export default Task;
