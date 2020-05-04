/**
* @module Akcje 
*/

import moment from 'moment';

export const CREATE_TASK = 'CREATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const SET_TASKS = 'SET_TASKS';

import { fetchTasks, insertTask, deleteTask, updateTaskDate } from '../../helpers/db';
import { isToday } from '../../helpers/helperFunctions';
import Task from '../../models/task';

/**
 * Funkcja będąca akcją utworzenia zadania.
 * 
 * @param {string} title - tytuł zadania
 * @param {string} type - typ zadania
 * @param {boolean} isSequential - czy zadanie jest sekwencyjne
 * @param {Date} date - data zadania
 * @param {number} sequentialInterval - co ile zadanie ma się powtarzać
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu wysyła akcję do reducer
 * @memberof module:Akcje 
*/
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

/**
 * Funkcja będąca akcją usunięcia zadania.
 * 
 * @param {number} id - identyfikator zadania
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu wysyła akcję do reducer
 * @memberof module:Akcje 
*/
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

/**
 * Funkcja będąca akcją zaktualizowania zadania.
 * 
 * @param {number} id - identyfikator zadania
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu wysyła akcję do reducer
 * @memberof module:Akcje 
*/
export const updateTask = (id) => {
	return async (dispatch, getState) => {
		const allTasks = getState().tasks.allTasks;
		const task = allTasks.find((t) => t.id === id);

		console.log(task);
		if (!task) return;

		let newDate = task.date;
		do {
			newDate = moment(newDate).add(task.sequentialInterval, 'days');
		} while (new Date(newDate) < new Date().setHours(0, 0, 0, 0));

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

/**
 * Funkcja będąca akcją załadowania zadań.
 * 
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu wysyła akcję do reducer
 * @memberof module:Akcje 
*/
export const loadTasks = () => {
	return async (dispatch) => {
		try {
			const dbResult = await fetchTasks();
			const resultArray = dbResult.rows._array;
			const loadedResults = [];

			for (const key in resultArray) {
				//If task is undone, but is sequential, then update to the next date!
				if (
					resultArray[key].isSequential &&
					new Date(resultArray[key].date) < new Date().setHours(0, 0, 0, 0)
				) {
					dispatch(updateTask(resultArray[key].id));
				}

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
