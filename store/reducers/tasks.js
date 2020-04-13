import { CREATE_TASK, REMOVE_TASK, SET_TASKS } from '../actions/tasks';
import Task from '../../models/task';

const initialState = {
	dailyTasks: [],
	sequentialTasks: [],
	anyTimeTasks: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_TASKS:
			const allTasks = action.tasks;
			return {
				...state,
				dailyTasks: allTasks,
			};
			
		case CREATE_TASK:
			const newTask = new Task(action.id, action.title);
			return {
				...state,
				dailyTasks: state.dailyTasks.concat(newTask),
			};

		case REMOVE_TASK:
			return {
				...state,
				dailyTasks: state.dailyTasks.filter((task) => task.id !== action.id),
			};

		default:
			return state;
	}
};
