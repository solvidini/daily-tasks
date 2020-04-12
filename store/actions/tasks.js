export const CREATE_TASK = 'CREATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';

export const createTask = (title) => {
	return { type: CREATE_TASK, title: title, id: new Date().toString() };
};

export const removeTask = (id) => {
	return { type: REMOVE_TASK, id: id };
};
