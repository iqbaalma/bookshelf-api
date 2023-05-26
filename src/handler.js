const {nanoid} = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	const book = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};
	books.push(book);

	const id = nanoid(16);
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	if (name === undefined) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});

		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});

		response.code(400);
		return response;
	}

	const isSuccess = books.filter(book => book.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});

		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal ditambahkan',
	});

	response.code(500);
	return response;
};

const getAllBooks = (request, h) => {
	const {name, reading, finished} = request.query;

	if (name !== undefined) {
		const booksName = books.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));

		const response = h.response({
			status: 'success',
			data: {
				books: booksName.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		return response;
	}

	if (reading !== undefined) {
		const booksRead = books.filter(book => Number(book.reading) === Number(reading));

		const response = h.response({
			status: 'success',
			data: {
				books: booksRead.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		return response;
	}

	if (reading !== undefined) {
		const booksFinished = books.filter(book => book.reading === finished);

		const response = h.response({
			status: 'success',
			data: {
				books: booksFinished.map(book => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});

		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'success',
		data: {
			books: books.map(book => ({
				id: book.id,
				name: book.name,
				publisher: book.publisher,
			})),
		},
	});

	response.code(200);
	return response;
};

const getBookById = (request, h) => {
	
};

module.exports = {
	addBook,
	getAllBooks,
};
