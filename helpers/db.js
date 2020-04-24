import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tasks.db');

/**
 * Funkcja służąca do utworzeniu tabeli (jeśli jeszcze nie istnieje) przechowującej zadania.
 * 
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu niesie informacje o powodzeniu, a przy odrzuceniu informacje o problemie, który mógł wystąpić
 */
export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, isSequential BOOLEAN, date TEXT, sequentialInterval INTEGER);',
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

/**
 * Funkcja służąca do dodania zadania do bazy.
 * 
 * @param {string} title - tytuł zadania
 * @param {string} type - typ zadania
 * @param {boolean} isSequential - czy zadanie jest sekwencyjne
 * @param {string} date - data zadania
 * @param {number} sequentialInterval - co ile zadanie ma się powtarzać
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu niesie informacje o powodzeniu, a przy odrzuceniu informacje o problemie, który mógł wystąpić
 */
export const insertTask = (title, type, isSequential, date, sequentialInterval) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO tasks (title, type, isSequential, date, sequentialInterval) VALUES (?, ?, ?, ?, ?);`,
				[title, type, isSequential, date, sequentialInterval],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

/**
 * Funkcja służąca do aktualizacji daty danego zadania.
 * 
 * @param {string} id - identyfikator zadania
 * @param {string} date - nowa data zadania
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu niesie informacje o powodzeniu, a przy odrzuceniu informacje o problemie, który mógł wystąpić
 */
export const updateTaskDate = (id, date) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`UPDATE tasks SET date=? WHERE id=? `,
				[date, id],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

/**
 * Funkcja służąca do usunięcia zadania z bazy danych.
 * 
 * @param {string} id - identyfikator zadania
 * @returns {Promise} - zwraca obietnicę, która przy rozwiązaniu niesie informacje o powodzeniu, a przy odrzuceniu informacje o problemie, który mógł wystąpić
 */
export const deleteTask = (id) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`DELETE FROM tasks WHERE id=?`,
				[id],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

/**
 * Funkcja służąca do wybrania i zwrócenia wszystkich rekordów z bazy.
 * 
 * @returns {Promise} - zwraca nam obietnicę, która przy rozwiązaniu zwróci nam wszystkie rekordy z bazy, a przy odrzuceniu informacje o problemie, który mógł wystąpić 
 */
export const fetchTasks = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'SELECT * FROM tasks',
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
