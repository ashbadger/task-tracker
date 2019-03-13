import styled from 'styled-components';

const colors = {
  red: 'rgb(255, 114, 114)',
  default: 'rgb(0, 134, 208);',
  blue: 'rgb(68, 123, 188)',
  gold: 'rgb(210, 194, 129)',
};

export default styled.button`
  background: none;
  border-radius: 5px;
  color: ${props => colors[props.color]};
  border: 2px solid ${props => colors[props.color]};
  font-size: small;
  font-weight: 500;
  padding: 8px 18px;
  text-transform: uppercase;
  transition: background 400ms ease 0s;

  &:hover {
    cursor: pointer;
    background: rgb(239, 237, 237);
  }

  &:focus {
    outline: none;
  }
`;
