class Task {
	constructor(id, title, type, isSequential, date, sequentialInterval) {
		this.id = id;
		this.title = title;
		this.type = type;
		this.isSequential = isSequential;
		this.date = date;
		this.sequentialInterval = sequentialInterval;
	}
}

export default Task;
