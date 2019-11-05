import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from './Button';
import navigateBack from '../../utils/navigateBack';

const BackButton = () => {
  const history = useHistory();

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

export default BackButton;
