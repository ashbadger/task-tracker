import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo.png';

const Navigation = styled.div`
  background: rgba(246, 246, 246, 1);
  height: 50px;
  padding: .5rem;
  border-bottom: 3px solid rgba(124, 124, 124, 1);
`;

const Image = styled.img`
  height: inherit;
`;

class Navbar extends React.Component {
  render() {
    return (
      <Navigation>
        <Image src={logo}></Image>
      </Navigation>
    )
  }
}

export default Navbar;