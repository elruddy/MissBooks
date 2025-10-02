import { bookService } from '../services/book.service.js';
import { utilService } from '../services/util.service.js';
import { LongTxt } from './LongTxt.jsx';

const { useState, useEffect } = React;

export function BookDetails({ bookId, onBack }) {
	const [book, setBook] = useState(null);

	useEffect(() => {
		loadBook();
	}, []);

	function loadBook() {
		bookService
			.get(bookId)
			.then((book) => setBook(book))
			.catch((err) => console.log('err:', err));
	}

	function getBookAge() {
		let currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		let currYearDiff = currentYear - book.publishedDate;
		return currYearDiff > 10 ? 'Vintage Book' : 'New Book';
	}

	function bookReadingLevel() {
		if (book.pageCount > 500) return 'Serious Reading';
		if (book.pageCount > 200) return 'Descent Reading';
		return 'Light Reading';
	}
	function colorPrice() {
		if (book.listPrice['amount'] > 150) return 'red';
		if (book.listPrice['amount'] < 20) return 'green';
	}

	if (!book) return <div>Loading Details...</div>;

	const { title, description, thumbnail, listPrice } = book;
	return (
		<section className="book-details container">
			<h1>Book Title: {title}</h1>
			<span>{getBookAge()}</span>
			<h4>{bookReadingLevel()}</h4>
			<h1>
				Book Price:{' '}
				<span className={colorPrice()}> {book.listPrice['amount']}</span>
			</h1>

			<LongTxt txt={description} length={15} />
			<img
				src={`../assets/img/${utilService.getRandomIntInclusive(1, 20)}.jpg`}
				alt="Book Image"
			/>
			{book.listPrice.isOnSale && <span>On Sale</span>}
			<button onClick={onBack}>Back</button>
		</section>
	);
}
