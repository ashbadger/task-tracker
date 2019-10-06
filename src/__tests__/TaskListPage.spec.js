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

afterEach(() => {
  cleanup();
  /* fetch global history object
   * navigate back to home page */
  const history = createBrowserHistory();
  history.push('/');
});

it(`should navigate to task's details page when task is clicked`, async () => {
  const history = createBrowserHistory();
  history.push('/tasks');
  const { getAllByTestId, getByText } = render(<AppRouter history={history} />);

  const taskNode = await waitForElement(() => getAllByTestId('task')[0]);

  fireEvent.click(taskNode);

  /* route to task details page */
  const allTasksButtonNode = await waitForElement(() => getByText('All Tasks'));
  expect(allTasksButtonNode).toBeDefined();
});

it('should navigate to create task page on create new task button click', async () => {
  const { getByText } = render(<AppRouter history={createBrowserHistory()} />);

  const createTaskButtonNode = await waitForElement(() =>
    getByText('Create New Task')
  );

  fireEvent.click(createTaskButtonNode);

  /* route to create task page */
  const undoButtonNode = await waitForElement(() => getByText('Undo'));
  expect(undoButtonNode).toBeDefined();
});
