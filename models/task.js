import moment from 'moment';

class Task {
	constructor(id, title, type, isSequential, date, sequentialInterval) {
		this.id = id;
		this.title = title;
		this.type = type;
		this.isSequential = isSequential;
		this.date = date;
		this.sequentialInterval = sequentialInterval;
	}

	get readableDate() {
		return moment(this.date).format('MMMM Do YYYY');
	}
}

export default Task;
