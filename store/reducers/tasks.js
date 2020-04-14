import { CREATE_TASK, REMOVE_TASK, SET_TASKS, UPDATE_TASK } from '../actions/tasks';
import Task from '../../models/task';
import isToday from '../../helpers/helperFunctions';

const initialState = {
	dailyTasks: [],
	sequentialTasks: [],
	anyTimeTasks: [],
	allTasks: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TASKS:
			return {
				...state,
				dailyTasks: action.dailyTasks,
				sequentialTasks: action.sequentialTasks,
				anyTimeTasks: action.anyTimeTasks,
				allTasks: action.allTasks,
			};

		case CREATE_TASK:
			const newTask = new Task(
				action.id,
				action.title,
				action.type,
				action.isSequential,
				action.date,
				action.sequentialInterval
			);
			if (isToday(newTask.date) && newTask.type === 'daily') {
				return {
					...state,
					dailyTasks: state.dailyTasks.concat(newTask),
					allTasks: state.allTasks.concat(newTask),
				};
			} else if (newTask.isSequential && newTask.type === 'daily') {
				return {
					...state,
					sequentialTasks: state.sequentialTasks.concat(newTask),
					allTasks: state.allTasks.concat(newTask),
				};
			} else if (newTask.type === 'anyTime') {
				return {
					...state,
					anyTimeTasks: state.anyTimeTasks.concat(newTask),
					allTasks: state.allTasks.concat(newTask),
				};
			} else {
				return {
					...state,
					allTasks: state.allTasks.concat(newTask),
				};
			}

		case REMOVE_TASK:
			return {
				...state,
				dailyTasks: state.dailyTasks.filter((task) => task.id !== action.id),
				sequentialTasks: state.sequentialTasks.filter((task) => task.id !== action.id),
				anyTimeTasks: state.anyTimeTasks.filter((task) => task.id !== action.id),
				allTasks: state.allTasks.filter((task) => task.id !== action.id),
			};

		case UPDATE_TASK:
			const updatedAllTasks = [...state.allTasks];
			const allTasksIndex = updatedAllTasks.findIndex((task) => task.id === action.id);
			updatedAllTasks[allTasksIndex].date = action.newDate;

			const updatedSequentialTasks = [...state.sequentialTasks];
			const sequentialTasksIndex = updatedSequentialTasks.findIndex((task) => task.id === action.id);
			updatedSequentialTasks[sequentialTasksIndex].date = action.newDate;

			return {
				...state,
				dailyTasks: state.dailyTasks.filter((task) => task.id !== action.id),
				allTasks: updatedAllTasks,
				sequentialTasks: updatedSequentialTasks,
			};

		default:
			return state;
	}
};
