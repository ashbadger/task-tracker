import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  background: rgba(210, 210, 210, 1);
  height: 30px;
  width: 100%;
  border-radius: 5px;
  text-align: center;
  position: relative;
  margin-top: 10px;
  box-shadow: 1px 0px 5px rgba(172, 172, 172, 1);
  border: solid .5px rgba(197, 197, 197, 1);
`;

const ProgressBar = styled.div`
  @keyframes bar-animation {
    0% { width: 0 }
    100% { width: ${props => props.width}% }
  };

  border-radius: 5px;
  height: inherit;
  background: rgba(0, 159, 0, 1);
  position: absolute;
  animation: bar-animation 1s 0s ease 1 forwards;
  width: ${props => props.width}%;
  top: 0;
`;

const ProgressText = styled.small`
  z-index: 1;
  position: inherit;
  top: 5px;
  font-weight: 700;
  color: black;
`;

class PercentageDisplay extends React.Component {
  getAggregatePercentage() {
    const { tasks: subtasks } = this.props;
    return ((subtasks.filter(t => t.complete).length / subtasks.length).toFixed(2) * 100) || 0;
  }

  render() {
    const percentage = this.getAggregatePercentage();

    return (
      <Container>
        <ProgressText>
          {percentage}
          %
        </ProgressText>
        <ProgressBar width={percentage} />
      </Container>
    );
  }
}

PercentageDisplay.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PercentageDisplay;
