import React from 'react';
import styled from 'styled-components';

const Text = styled.textarea`
  width: 100%;
  height: 300px;
  border: none;
  font-family: 'Roboto';
  font-size: small;
  border-radius: .5rem;
  box-shadow: 0 1px 5px rgba(125, 125, 125, 1);
  padding: 1rem;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
  }
`;

const TextArea = () => (<Text />);

export default TextArea;
