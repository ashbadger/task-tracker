import styled from 'styled-components';

export default styled.div`
  height: -webkit-fill-available;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;

  @media screen and (max-width: 767px) {
    margin-left: 0;
    padding: 0 0.5rem;
    -webkit-overflow-scrolling: touch;
  }
`;
