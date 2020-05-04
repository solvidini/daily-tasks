/**
 * Funkcja stwierdzająca czy podana data jest dzisiaj, czy nie.
 * 
 * @param {Date} someDate - przekazywana data
 * @returns {boolean}
 * @module Funkcje pomocnicze
*/
export const isToday = (someDate) => {
	const today = new Date();
	return (
		someDate.getDate() == today.getDate() &&
		someDate.getMonth() == today.getMonth() &&
		someDate.getFullYear() == today.getFullYear()
	);
};
