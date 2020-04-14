import moment from 'moment';

export const CREATE_TASK = 'CREATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const SET_TASKS = 'SET_TASKS';

import { fetchTasks, insertTask, deleteTask, updateTaskDate } from '../../helpers/db';
import { isToday } from '../../helpers/helperFunctions';
import Task from '../../models/task';

export const createTask = (title, type, isSequential, date, sequentialInterval) => {
	return async (dispatch) => {
		try {
			const dbResult = await insertTask(title, type, isSequential, date.toISOString(), sequentialInterval);
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
			await deleteTask(id);
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

export const updateTask = (id) => {
	return async (dispatch, getState) => {
		const allTasks = getState().tasks.allTasks;
		const task = allTasks.find((t) => t.id === id);

		const oldDate = task.date;
		const newDate = moment(oldDate).add(task.sequentialInterval, 'days');

		try {
			await updateTaskDate(id, newDate.toISOString());
			dispatch({
				type: UPDATE_TASK,
				id: id,
				newDate: newDate,
			});
			loadTasks();
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
			const resultArray = dbResult.rows._array;
			const loadedResults = [];

			for (const key in resultArray) {
				loadedResults.push(
					new Task(
						resultArray[key].id,
						resultArray[key].title,
						resultArray[key].type,
						resultArray[key].isSequential,
						new Date(resultArray[key].date),
						resultArray[key].sequentialInterval
					)
				);
			}

			const dailyTasks = loadedResults.filter((task) => isToday(task.date) && task.type === 'daily');
			const sequentialTasks = loadedResults.filter((task) => task.isSequential && task.type === 'daily');
			const anyTimeTasks = loadedResults.filter((task) => task.type === 'anyTime');
			const allTasks = loadedResults;

			dispatch({ type: SET_TASKS, dailyTasks, sequentialTasks, anyTimeTasks, allTasks });
		} catch (err) {
			throw err;
		}
	};
};
