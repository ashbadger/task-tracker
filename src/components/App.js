import React from 'react';
import { injectGlobal } from 'styled-components';

import AppRouter from '../routers/AppRouter';
import Navbar from './Navbar';
import Card from './Card';
import background from '../assets/images/background.png';

injectGlobal`
  body {
    margin: 0px;
    overflow: hidden;
    height: 100%;
    font-family: 'Roboto';
    background-image: url(${background});
  }
`;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Card>
          <AppRouter />
        </Card>
      </div>
    );
  }
}
