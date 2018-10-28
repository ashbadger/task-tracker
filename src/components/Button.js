import styled from 'styled-components';

const colors = {
  red: {
    background: 'rgba(255, 67, 67, 1)',
    'border-bottom': 'rgba(195, 0, 0, 1)',
  },
  green: {
    background: 'rgba(46, 170, 46, 1)',
    'border-bottom': 'rgba(0, 128, 0, 1)',
  },
  navy: {
    background: 'rgba(43, 100, 167, 1)',
    'border-bottom': 'rgba(31, 71, 117, 1)',
  },
};

export default styled.button`
  padding: 8px 18px;
  border-radius: 5px;
  font-size: small;
  background: ${props => colors[props.color].background};
  border-bottom: solid 3px ${props => colors[props.color]['border-bottom']};
  color: rgba(255, 255, 255, 1);
  font-weight: 600;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;
