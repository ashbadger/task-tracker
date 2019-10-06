import React from 'react';
import { cleanup, render, waitForElement } from '@testing-library/react';

import Task from '../components/shared/Task';
import tasks from '../fixtures/tasks';

afterEach(cleanup);

it('should render task name', async () => {
  const { name, completed, subtasks } = { ...tasks[0] };

  const { getByTestId } = render(
    <Task name={name} complete={completed} subtasks={subtasks} />
  );

  const nameNode = await waitForElement(() => getByTestId('name'));
  expect(nameNode.textContent).toBe(name);
});

it('should render time spent on task', async () => {
  const { name, completed, subtasks } = { ...tasks[0] };

  const { getByTestId } = render(
    <Task name={name} complete={completed} subtasks={subtasks} />
  );

  const timeSpentNode = await waitForElement(() => getByTestId('time-spent'));
  expect(timeSpentNode.textContent).toMatch(
    /(\d+d\s)?(\d+h\s)?(\d+m\s)?\d+(ms|s)/gi
  );
});

it(`should render task percentage of completion`, async () => {
  const { name, completed, subtasks } = { ...tasks[0] };

  const { getByTestId } = render(
    <Task name={name} complete={completed} subtasks={subtasks} />
  );

  const completeNode = await waitForElement(() => getByTestId('completed'));
  expect(completeNode.textContent).toMatch(/\d+%/);
});

it(`should render subtask completion`, async () => {
  const { name, completed, timeSpent } = { ...tasks[0].subtasks[0] };

  const { getByTestId } = render(
    <Task name={name} completed={completed} timeSpend={timeSpent} isSubtask />
  );

  const completeNode = await waitForElement(() => getByTestId('completed'));
  expect(completeNode.textContent).toBe(completed ? 'Yes' : 'No');
});
