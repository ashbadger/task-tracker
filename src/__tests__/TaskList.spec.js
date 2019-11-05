import React from 'react';
import { createBrowserHistory } from 'history';
import { cleanup, render, waitForElement } from '@testing-library/react';

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

it('should render all tasks', async () => {
  const { getByTestId, getAllByTestId } = render(<AppRouter />);

  const taskListNode = await waitForElement(() => getByTestId('task-list'));
  expect(taskListNode).toBeDefined();

  const allTaskNodes = await waitForElement(() => getAllByTestId('task'));
  expect(allTaskNodes.length).toBe(tasks.length);
});

it(`should render single task name`, async () => {
  const { getAllByTestId } = render(<AppRouter />);

  const taskNode = await waitForElement(() => getAllByTestId('task')[0]);

  expect(taskNode.querySelector('.name').textContent).not.toBe('');
});

it(`should render single task time spent`, async () => {
  const { getAllByTestId } = render(<AppRouter />);

  const taskNode = await waitForElement(() => getAllByTestId('task')[0]);

  expect(taskNode.querySelector('.time-spent').textContent).not.toBe('0ms');
  expect(taskNode.querySelector('.time-spent').textContent).toMatch(
    /(\d+d\s)?(\d+h\s)?(\d+m\s)?\d+(ms|s)/gi
  );
});

it(`should render single task completed`, async () => {
  const { getAllByTestId } = render(<AppRouter />);

  const taskNode = await waitForElement(() => getAllByTestId('task')[0]);

  expect(taskNode.querySelector('.completed').textContent).toMatch(
    /* percentage > 0% */
    /[1-9](\d)?%/g
  );
});
