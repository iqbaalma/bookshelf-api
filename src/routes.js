const {
	addBook,
	getAllBooks,
	getBookById,
	editBook,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBook,
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBooks,
	},
	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: getBookById,
	},
	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: editBook,
	},
];

module.exports = routes;
