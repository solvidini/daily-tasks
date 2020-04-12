import { CREATE_TASK, REMOVE_TASK } from '../actions/tasks';
import Task from '../../models/task';

const initialState = {
	tasks: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TASK:
			const newTask = new Task(action.id, action.title);
			return {
				...state,
				tasks: state.tasks.concat(newTask),
			};

		case REMOVE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.id),
			};

		default:
			return state;
	}
};
