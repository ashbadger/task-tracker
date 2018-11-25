import styled from 'styled-components';

const colors = {
  red: {
    background: 'rgb(255, 114, 114)',
    'border-bottom': 'rgb(197, 21, 21)',
  },
  green: {
    background: 'rgb(126, 166, 126)',
    'border-bottom': 'rgb(89, 139, 89)',
  },
  blue: {
    background: 'rgb(68, 123, 188)',
    'border-bottom': 'rgb(41, 83, 131)',
  },
  gold: {
    background: 'rgb(210, 194, 129)',
    'border-bottom': 'rgb(138, 119, 62)',
  },
};

export default styled.button`
  background: ${props => colors[props.color].background};
  border-bottom: solid 3px ${props => colors[props.color]['border-bottom']};
  border-radius: 5px;
  color: rgba(255, 255, 255, 1);
  font-size: small;
  font-weight: 600;
  padding: 8px 18px;
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    transform: translateY(-1px);
    margin-bottom: -1px;
    border-bottom-width: 4px;
  }

  &:focus {
    outline: none;
  }

  &:active {
    border-bottom: solid 2px ${props => colors[props.color]['border-bottom']};
    transform: translateY(1px);
    margin-bottom: 1px;
  }
`;
