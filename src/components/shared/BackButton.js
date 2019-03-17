import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import { navigateBack } from '../../routers/AppRouter';

const propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

const BackButton = ({ history }) => {
  const isTaskPage = history.location.pathname.match(/\/tasks\/((?!create).)*$/g);
  const isSubtaskPage = history.location.pathname.match(/\/tasks\/((?!create).)*$\/((?!create).)*$/g);
  let buttonText;

  if (isTaskPage) buttonText = 'All Tasks';
  else if (isSubtaskPage) buttonText = 'Back to Task';
  else buttonText = 'Undo';

  return (
    <Button onClick={() => navigateBack(history)}>
      { buttonText }
    </Button>
  );
};

BackButton.propTypes = propTypes;

export default BackButton;
