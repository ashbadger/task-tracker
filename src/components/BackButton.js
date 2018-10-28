import React from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.div`
  position: absolute;
  left: .5rem;
  top: .5rem;

  .button:hover {
    color: rgba(120, 120, 120, 1) !important;
    transform: scale(1.1, 1.1);
    transition-timing-function: ease;
    transition-duration: 200ms;
    cursor: pointer;
  }
`;

const propTypes = {
  history: PropTypes.shape({}).isRequired,
};

class BackButton extends React.Component {
  navigateBack = () => {
    const { history } = this.props;
    history.goBack();
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
