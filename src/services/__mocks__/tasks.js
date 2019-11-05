import tasks from '../../fixtures/tasks';

export default class TaskService {
  createTask = async task => {
    return Promise.resolve({
      id: '1',
      ...task,
    });
  };

  updateTask = async task => {
    return Promise.resolve({
      id: '1',
      ...task,
    });
  };

  getTask = async id => {
    return Promise.resolve({
      ...(tasks.filter(t => t.id.toString() === id)[0] || { id, subtasks: [] }),
    });
  };

  getTasks = async => {
    return Promise.resolve([...tasks]);
  };

  getSubtask = async (taskId, subtaskId) => {
    const task = tasks.find(t => t.id === taskId);
    const subtask = task.subtasks.find(s => s.id === subtaskId);
    return Promise.resolve(subtask);
  };
}
