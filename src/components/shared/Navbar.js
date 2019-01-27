import React from 'react';
import styled from 'styled-components';

import logo from '../../../public/images/logo.png';

const Navigation = styled.div`
  background: rgba(223, 223, 223, 1);
  border-bottom: 3px solid rgba(124, 124, 124, 1);
  height: 50px;
  padding: .5rem;

  @media screen and (max-height: 450px) {
    height: 25px;
  }
`;

const Logo = styled.a`
  &, img {
    height: inherit;
  }
`;

const Navbar = () => (
  <Navigation>
    <Logo href="/tasks">
      <img src={logo} alt="logo" />
    </Logo>
  </Navigation>
);

export default Navbar;
