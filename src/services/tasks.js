import db from '../firebase/firebase';

export default class TaskService {
  createTask = (task) => {
    return db.collection('tasks').add(task)
      .then(documentRef => documentRef.get())
      .then(docSnapshot => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  };

  getTasks = async () => {
    return Promise.all(await db.collection('tasks').get()
      .then(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(docs => docs.map(async (doc) => {
        return this.getSubtasks(doc.id).then(subtasks => ({ ...doc, subtasks }));
      })));
  };

  getTask = async (id) => {
    const task = await db.collection('tasks').doc(id).get()
      .then(t => ({ ...t.data(), id: t.id }));

    const subtasks = await this.getSubtasks(id);

    return { ...task, subtasks };
  };

  updateTask = (id, updates) => {
    return db.collection('tasks').doc(id).update(updates);
  };

  deleteTask = (id) => {
    return db.collection('tasks').doc(id).delete();
  };

  createSubtask = (taskId, subtask) => {
    return db.collection(`tasks/${taskId}/subtasks`).add(subtask)
      .then(task => task.get())
      .then(task => ({ id: task.id, ...task.data() }));
  };

  getSubtasks = (taskId) => {
    return db.collection(`tasks/${taskId}/subtasks`).get()
      .then(querySnapshot => querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  getSubtask = (taskId, subtaskId) => {
    return db.collection(`tasks/${taskId}/subtasks`).doc(subtaskId).get()
      .then(task => task.data());
  };

  updateSubtask = (taskId, subtaskId, updates) => {
    return db.collection(`tasks/${taskId}/subtasks`).doc(subtaskId).update(updates);
  };

  deleteSubtask = (taskId, subtaskId) => {
    return db.collection(`tasks/${taskId}/subtasks`).doc(subtaskId).delete();
  };
}
