import React from 'react';
import { createBrowserHistory } from 'history';
import { cleanup, render, waitForElement } from '@testing-library/react';

import TaskList from '../components/shared/TaskList';
import tasks from '../fixtures/tasks';

jest.mock('../services/tasks');

afterEach(() => {
  cleanup();
  /* fetch global history object
   * navigate back to home page */
  const history = createBrowserHistory();
  history.push('/');
});

it('should render all tasks', async () => {
  const { getByTestId, getAllByTestId } = render(
    <TaskList history={createBrowserHistory()} />
  );

  const taskListNode = await waitForElement(() => getByTestId('task-list'));
  expect(taskListNode).toBeDefined();

  const allTaskNodes = await waitForElement(() => getAllByTestId('task'));
  expect(allTaskNodes.length).toBe(tasks.length);
});

it(`should render task's properties correctly`, async () => {
  const { getAllByTestId } = render(
    <TaskList history={createBrowserHistory()} />
  );

  const taskNode = await waitForElement(() => getAllByTestId('task')[0]);

  /* our first task has subtasks that are completed + have time spent.
   * therefore, time spent and completed should not have 0 like values */
  expect(taskNode.querySelector('.name').textContent).not.toBe('');
  expect(taskNode.querySelector('.time-spent').textContent).not.toBe('0ms');
  expect(taskNode.querySelector('.completed').textContent).toMatch(
    /* percentage > 0% */
    /[1-9](\d)?%/g
  );
});
