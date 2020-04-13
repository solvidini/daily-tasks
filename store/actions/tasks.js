export const CREATE_TASK = 'CREATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const SET_TASKS = 'SET_TASKS';

import { fetchTasks, insertTask, deleteTask } from '../../helpers/db';

export const createTask = (title, type, isSequential, date, sequentialInterval) => {
	return async (dispatch) => {
		try {
			const dbResult = await insertTask(title, type, isSequential, date, sequentialInterval);
			console.log(dbResult);
			dispatch({
				type: CREATE_TASK,
				id: dbResult.insertId,
				title: title,
				type: type,
				isSequential: isSequential,
				date: date,
				sequentialInterval: sequentialInterval,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const removeTask = (id) => {
	return async (dispatch) => {
		try {
			const dbResult = await deleteTask(id);
			console.log(dbResult);
			dispatch({
				type: REMOVE_TASK,
				id: id,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadTasks = () => {
	return async (dispatch) => {
		try {
			const dbResult = await fetchTasks();
			console.log(dbResult.rows._array);
			dispatch({ type: SET_TASKS, tasks: dbResult.rows._array });
		} catch (err) {
			throw err;
		}
	};
};
