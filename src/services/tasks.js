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

const createTask = (task) => {
	return db.collection('tasks').add(task)
		.then(task => task.data());
};

const updateTask = (id, updates) => {
	return db.collection('tasks').doc(`/${id}`).update(updates)
		.then(task => task.data());
};

const updateSubtasks = (task) => {
	const { id } = task;
	return db.collection('tasks').doc(`/${id}`).set(task)
		.then(task => task.data());	
};

const deleteTask = (id) => {
	return db.collection('tasks').doc(`/${id}`).delete()
		.then(task => task.data());
};

export { getTasks, getTask, getSubtask, createTask, updateTask, updateSubtasks, deleteTask };
