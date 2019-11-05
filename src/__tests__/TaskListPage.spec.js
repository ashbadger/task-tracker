import React from 'react';
import { createBrowserHistory } from 'history';
import {
  cleanup,
  render,
  waitForElement,
  fireEvent,
} from '@testing-library/react';

import AppRouter from '../routers/AppRouter';

jest.mock('../services/tasks');

let history = createBrowserHistory();

beforeEach(() => {
  /* reset global history object */
  history = createBrowserHistory();
  history.push('/');
});

afterEach(() => {
  cleanup();
});

it(`should navigate to task's details page when task is clicked`, async () => {
  const { getAllByTestId, getByText } = render(<AppRouter />);

  const taskNode = await waitForElement(() => getAllByTestId('task')[0]);

  /* route to task details page */
  fireEvent.click(taskNode);

  const allTasksButtonNode = await waitForElement(() => getByText('All Tasks'));
  expect(allTasksButtonNode).toBeDefined();
});

it('should navigate to create task page on create new task button click', async () => {
  const { getByText } = render(<AppRouter />);

  const createTaskButtonNode = await waitForElement(() =>
    getByText('Create New Task')
  );

  /* route to create task page */
  fireEvent.click(createTaskButtonNode);

  const undoButtonNode = await waitForElement(() => getByText('Undo'));
  expect(undoButtonNode).toBeDefined();
});
