import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.div`
  left: .5rem;
  position: absolute;
  top: .5rem;

  & svg:hover {
    color: rgba(120, 120, 120, 1) !important;
    cursor: pointer;
    transform: scale(1.1, 1.1);
  }
`;

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

class BackButton extends React.Component {
  navigateBack = () => {
    const { history } = this.props;
    const location = {
      pathname: history.location.pathname.split('/').slice(0, -1).join('/'),
      navigateToPrevious: true,
    };
    history.push(location);
  }

  render() {
    return (
      <Button>
        <FiArrowLeftCircle fill="transparent" size="2rem" color="rgb(173, 173, 173)" strokeWidth={1.5} className="button" onClick={this.navigateBack} />
      </Button>
    );
  }
}

BackButton.propTypes = propTypes;

export default BackButton;
