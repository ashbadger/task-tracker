import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo.png';

const Navigation = styled.div`
  background: rgba(246, 246, 246, 1);
  height: 50px;
  padding: .5rem;
  border-bottom: 3px solid rgba(124, 124, 124, 1);
`;

const Logo = styled.a`
  &, img {
		height: inherit;
	}
`;

class Navbar extends React.Component {
  render() {
    return (
			<Navigation>
				<Logo href="/tasks">
        	<img src={logo} />
				</Logo>
      </Navigation>
    );
  };
};

export default Navbar;
