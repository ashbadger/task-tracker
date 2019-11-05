import React from 'react';
import {
  cleanup,
  render,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import { createBrowserHistory } from 'history';

import tasks from '../fixtures/tasks';
import AppRouter from '../routers/AppRouter';

jest.mock('../services/tasks');
let history;

beforeEach(() => {
  /* reset global history object */
  history = createBrowserHistory();
  history.push('/');
});

afterEach(() => {
  cleanup();
});

it('should render subtask name', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByLabelText } = render(<AppRouter />);

  const nameNode = await waitForElement(() => getByLabelText('name'));
  expect(nameNode.value).toBe(subtask.name);
});

it('should update subtask name on input', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByLabelText } = render(<AppRouter />);

  const taskName = 'A new task name';

  const nameInputNode = await waitForElement(() => getByLabelText('name'));
  fireEvent.change(nameInputNode, { target: { value: taskName } });

  expect(nameInputNode.value).toBe(taskName);
});

it('should render subtask time spent', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByLabelText } = render(<AppRouter />);

  const timeSpentNode = await waitForElement(() =>
    getByLabelText('time spent')
  );

  expect(timeSpentNode.textContent).not.toBe('0ms');
  expect(timeSpentNode.textContent).toMatch(
    /(\d+d )?(\d+h )?(\d+m )?(\d+s)?( )?(\d+ms)?/g
  );
});

it('should toggle timer button on click', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByText } = render(<AppRouter />);

  const startButtonNode = await waitForElement(() => getByText('start'));

  fireEvent.click(startButtonNode);

  expect(startButtonNode.textContent).toBe('stop');
});

it('should render toggle', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByRole } = render(<AppRouter />);

  const switchNode = await waitForElement(() => getByRole('switch'));

  expect(subtask.completed).toBe(switchNode.checked);
});

it('should toggle subtask is complete on click', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByRole } = render(<AppRouter />);

  const switchNode = await waitForElement(() => getByRole('switch'));
  const { checked: prevChecked } = switchNode;

  fireEvent.click(switchNode);

  expect(switchNode.checked).toBe(!prevChecked);
});

it('should update subtask notes on input', async () => {
  const task = tasks[0];
  const subtask = tasks[0].subtasks[0];

  history.push(`/tasks/${task.id}/${subtask.id}`);

  const { getByLabelText } = render(<AppRouter />);

  const notes = 'some notes';

  const nameInputNode = await waitForElement(() => getByLabelText('notes'));
  fireEvent.change(nameInputNode, { target: { value: notes } });

  expect(nameInputNode.value).toBe(notes);
});
