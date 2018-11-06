import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  background: rgba(210, 210, 210, 1);
  border: solid .5px rgba(197, 197, 197, 1);
  border-radius: 5px;
  box-shadow: 1px 0px 5px rgba(172, 172, 172, 1);
  height: 30px;
  margin-top: 10px;
  position: relative;
  text-align: center;
  width: 100%;
`;

const ProgressBar = styled.div`
  @keyframes bar-animation {
    0% { width: 0 }
    100% { width: '${props => props.width}%' }
  };

  border-radius: 5px;
  height: inherit;
  background: rgb(126, 166, 126);
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
  color: ${props => (props.percentage > 60 ? 'white' : 'rgba(19, 19, 19, 0.8)')};
`;

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

class PercentageDisplay extends React.Component {
  getAggregatePercentage() {
    const { tasks: subtasks } = this.props;
    return ((subtasks.filter(t => t.completed).length / subtasks.length).toFixed(2) * 100) || 0;
  }

  render() {
    const percentage = this.getAggregatePercentage();

    return (
      <Container>
        <ProgressText percentage={percentage}>
          {percentage}
          %
        </ProgressText>
        <ProgressBar width={percentage} />
      </Container>
    );
  }
}

PercentageDisplay.propTypes = propTypes;

export default PercentageDisplay;
