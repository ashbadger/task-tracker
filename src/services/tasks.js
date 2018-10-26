import db from '../firebase/firebase';

const getTasks = () => {
	return db.collection('tasks').get()
		.then(tasks => tasks.docs.map(task => task.data()));
};

const getTask = (id) => {
	return db.collection('tasks').doc(`/${id}`).get()
		.then(task => task.data());
};

const getSubtask = (taskId, subtaskId) => {
	return db.collection('tasks').doc(`/${taskId}`).get()
		.then(task => task.data().subtasks.find(subtask => subtask.id == subtaskId));
};

export { getTasks, getTask, getSubtask };
