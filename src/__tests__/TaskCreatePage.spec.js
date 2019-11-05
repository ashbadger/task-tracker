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

let history;

beforeEach(() => {
  /* reset global history object */
  history = createBrowserHistory();
  history.push('/tasks/create');
});

afterEach(() => {
  cleanup();
});

it('should update name on input', async () => {
  const { getByLabelText } = render(<AppRouter />);

  const taskName = 'A new task name';

  const nameInputNode = await waitForElement(() => getByLabelText('name'));
  fireEvent.change(nameInputNode, { target: { value: taskName } });

  expect(nameInputNode.value).toBe(taskName);
});

it('should update notes on input', async () => {
  const { getByLabelText } = render(<AppRouter />);
  const taskNotes = 'Some notes for a task';

  const notesInputNode = await waitForElement(() => getByLabelText('notes'));
  fireEvent.change(notesInputNode, { target: { value: taskNotes } });

  expect(notesInputNode.value).toBe(taskNotes);
});

it('should create task on button click and navigate to task details page', async () => {
  const { getByText, getByLabelText } = render(<AppRouter />);

  const taskName = 'A new task name';

  const nameInputNode = await waitForElement(() => getByLabelText('name'));
  fireEvent.change(nameInputNode, { target: { value: taskName } });

  const createButtonNode = await waitForElement(() => getByText('Create Task'));

  fireEvent.click(createButtonNode);

  /* route to task detail page */
  const allTasksButtonNode = await waitForElement(() => getByText('All Tasks'));

  expect(allTasksButtonNode).toBeDefined();
});
