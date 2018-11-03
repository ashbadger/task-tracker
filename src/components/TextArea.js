import React from 'react';
import styled from 'styled-components';

const Text = styled.textarea`
  border: none;
  border-radius: .5rem;
  box-shadow: 0 1px 5px rgba(125, 125, 125, 1);
  box-sizing: border-box;
  font-family: 'Roboto';
  font-size: small;
  height: 300px;
  padding: 1rem;
  resize: vertical;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const TextArea = () => (<Text />);

export default TextArea;
