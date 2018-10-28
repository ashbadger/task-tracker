import db from '../firebase/firebase';

const getTasks = () => db.collection('tasks').get()
  .then(tasks => tasks.docs.map(task => task.data()));

const getTask = id => db.collection('tasks').doc(`/${id}`).get()
  .then(task => task.data());

const getSubtask = (taskId, subtaskId) => db.collection('tasks').doc(`/${taskId}`).get()
  .then(task => task.data().subtasks.find(subtask => subtask.id == subtaskId));

const createTask = task => db.collection('tasks').add(task)
  .then(res => res.data());

const updateTask = (id, updates) => db.collection('tasks').doc(`/${id}`).update(updates)
  .then(task => task.data());

const updateSubtasks = (task) => {
  const { id } = task;
  return db.collection('tasks').doc(`/${id}`).set(task)
    .then(res => res.data());
};

const deleteTask = id => db.collection('tasks').doc(`/${id}`).delete()
  .then(task => task.data());

export {
  getTasks, getTask, getSubtask, createTask, updateTask, updateSubtasks, deleteTask,
};
