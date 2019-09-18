import styled from 'styled-components';

const TextArea = styled.textarea`
  border: 1px solid rgb(222, 222, 222);
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-family: 'Roboto';
  font-size: small;
  height: 15rem;
  padding: 1rem;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export default TextArea;
