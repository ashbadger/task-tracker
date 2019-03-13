import React from 'react';
import styled from 'styled-components';

import logo from '../../../public/images/logo.png';

const Navigation = styled.div`
  background: rgb(0, 122, 236);
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

  img:hover {
    transform: scale(1.1);
    transition: all 400ms cubic-bezier(0.42, 0, 0, 3.29) 0s;
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
