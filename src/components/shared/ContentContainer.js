import styled from 'styled-components';

export default styled.div`
  height: -webkit-fill-available;
  margin-left: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0 1rem;
  position: relative;

  @media screen and (max-width: 767px) {
    margin-left: 0;
    padding: 0 .5rem;
    -webkit-overflow-scrolling: touch;
  }
`;
