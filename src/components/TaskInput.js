import styled from 'styled-components';

export default styled.input`
  color: rgba(53, 59, 90, 1);
  background-color: transparent;
  border: transparent;
  font-size: 2rem;
  font-weight: 500;
  width: 100%;
  border-bottom: solid 1px rgba(0, 0, 0, 1);
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-bottom-color: rgba(223, 200, 76, 1);
  }
`;
