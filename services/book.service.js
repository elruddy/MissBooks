import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'bookDB';
const CACHE_STORAGE_KEY = 'googleBooksCache';
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {};
var gFilterBy = { title: '', minPrice: 0 };

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptybook,
	getNextbookId,
	getFilterBy,
	setFilterBy,
	getGoogleBooks,
	addGoogleBook,
};

function query() {
	// return _createBooks();

	return storageService.query(BOOK_KEY).then((books) => {
		if (gFilterBy.title) {
			const regex = new RegExp(gFilterBy.title, 'i');
			books = books.filter((book) => regex.test(book.title));
		}

		if (gFilterBy.minPrice) {
			books = books.filter(
				(book) => book.listPrice.amount <= gFilterBy.minPrice
			);
		}

		// here is osm bug work only on firt load that it creates 20 books then is two
		if (!books || books.length === 0) {
			books = _createBooks();
		}

		return books;
	});
}

function get(bookId) {
	return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId);
}

function remove(bookId) {
	return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
	if (book.id) {
		return storageService.put(BOOK_KEY, book);
	} else {
		return storageService.post(BOOK_KEY, book);
	}
}

function getEmptybook(
	title = '',
	publishedDate = 1990,
	description = utilService.makeLorem(20)
) {
	return {
		id: null,
		title,
		subtitle: '',
		authors: [],
		publishedDate,
		description,
		pageCount: 0,
		categories: [],
		thumbnail: '',
		language: 'en',
		listPrice: {
			amount: 0,
			currencyCode: 'EUR',
			isOnSale: false,
		},
	};
}

function getFilterBy() {
	return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
	if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
	if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice;
	return gFilterBy;
}

function getNextbookId(bookId) {
	return storageService.query(BOOK_KEY).then((books) => {
		let nextbookIdx = books.findIndex((book) => book.id === bookId) + 1;
		if (nextbookIdx === books.length) nextbookIdx = 0;
		return books[nextbookIdx].id;
	});
}

// function _createbook(title, listPrice = 80) {
//   const book = getEmptybook(title, listPrice);
//   book.id = utilService.makeId();
//   book.title;
//   book.listPrice;
//   return book;
// }

function getGoogleBooks(bookName) {
	if (bookName === '') return Promise.resolve();
	const googleBooks = gCache[bookName];
	if (googleBooks) {
		console.log('data from storage...', googleBooks);
		return Promise.resolve(googleBooks);
	}

	const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`;

	return axios.get(url).then((res) => {
		console.log({ res });
		const data = res.data.items;
		console.log('data from network...', data);
		const books = _formatGoogleBooks(data);
		gCache[bookName] = books;
		utilService.saveToStorage(CACHE_STORAGE_KEY, gCache);
		return books;
	});
}

function addGoogleBook(book) {
	return storageService.post(BOOK_KEY, book, false);
}

function _createBooks() {
	const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
	let books = [];
	for (let i = 0; i < 20; i++) {
		const book = {
			id: utilService.makeId(),
			title: utilService.makeLorem(2),
			subtitle: utilService.makeLorem(4),
			authors: [utilService.makeLorem(1)],
			publishedDate: utilService.getRandomIntInclusive(1950, 2024),
			description: utilService.makeLorem(20),
			pageCount: utilService.getRandomIntInclusive(20, 600),
			categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
			thumbnail: `/assets/img/${i + 1}.jpg`,
			language: 'en',
			listPrice: {
				amount: utilService.getRandomIntInclusive(80, 500),
				currencyCode: 'EUR',
				isOnSale: Math.random() > 0.7,
			},
		};
		books.push(book);
		storageService.post(BOOK_KEY, book);
	}
	return books;
}

function _setNextPrevBookId(book) {
	return query().then((books) => {
		const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
		const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
		const prevBook = books[bookIdx - 1]
			? books[bookIdx - 1]
			: books[books.length - 1];
		book.nextBookId = nextBook.id;
		book.prevBookId = prevBook.id;
		return book;
	});
}

function _formatGoogleBooks(googleBooks) {
	return googleBooks.map((googleBook) => {
		const { volumeInfo } = googleBook;

		let bookPublishedYear =
			volumeInfo.publishedDate.length > 4
				? volumeInfo.publishedDate.slice(0, 4)
				: volumeInfo.publishedDate;

		const book = {
			id: googleBook.id,
			title: volumeInfo.title,
			description: volumeInfo.description,
			pageCount: volumeInfo.pageCount,
			authors: volumeInfo.authors,
			categories: volumeInfo.categories,
			publishedDate: +bookPublishedYear,
			language: volumeInfo.language,
			listPrice: {
				amount: utilService.getRandomIntInclusive(80, 500),
				currencyCode: 'EUR',
				isOnSale: Math.random() > 0.7,
			},
			reviews: [],
		};
		if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail;
		return book;
	});
}
