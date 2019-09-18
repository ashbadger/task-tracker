import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import navigateBack from '../../utils/navigateBack';

const propTypes = {
  history: PropTypes.isRequired,
};

const BackButton = ({ history }) => {
  const isSubtaskPage = history.location.pathname.match(
    /\/tasks\/((?!create).).*\/((?!create).).*/g
  );
  const isTaskPage = history.location.pathname.match(
    /\/tasks\/((?!create).)*$/g
  );
  let buttonText;

  if (isSubtaskPage) buttonText = 'Back to Task';
  else if (isTaskPage) buttonText = 'All Tasks';
  else buttonText = 'Undo';

  return <Button onClick={() => navigateBack(history)}>{buttonText}</Button>;
};

BackButton.propTypes = propTypes;

export default BackButton;
