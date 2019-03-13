import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  background: rgba(210, 210, 210, 1);
  border: solid .5px rgba(197, 197, 197, 1);
  border-radius: 5px;
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
  background: rgb(15, 154, 14);
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
  percentage: PropTypes.number.isRequired,
};

const PercentageDisplay = (props) => {
  const { percentage } = props;
  return (
    <Container>
      <ProgressText percentage={percentage}>
        {percentage}
        %
      </ProgressText>
      <ProgressBar width={percentage} />
    </Container>
  );
};

PercentageDisplay.propTypes = propTypes;

export default PercentageDisplay;
