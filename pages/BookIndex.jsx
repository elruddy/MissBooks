import { BookFilter } from '../cmps/BookFilter.jsx';
import { BookList } from '../cmps/BookList.jsx';
import { bookService } from '../services/book.service.js';
import { showSuccessMsg } from '../services/event-bus.service.js';

// import { animateCSS } from "../services/util.service.js"
const { Link } = ReactRouterDOM;

const { useState, useEffect } = React;

export function BookIndex() {
	const [books, setBooks] = useState(null);
	const [filterBy, setFilterBy] = useState(bookService.getFilterBy());

	useEffect(() => {
		loadBooks();
	}, [filterBy]);

	function loadBooks() {
		bookService
			.query(filterBy)
			.then(setBooks)
			.catch((err) => console.log('err:', err));
	}

	function onRemoveBook(bookId) {
		bookService
			.remove(bookId)
			.then(() => {
				setBooks((books) => books.filter((book) => book.id !== bookId));
				showSuccessMsg('Book has been successfully removed!');
			})
			.catch(() => {
				showErrorMsg(`couldn't remove book`);
			});
	}
	function onSetFilterBy(newFilterBy) {
		const prevFilter = bookService.getFilterBy();
		newFilterBy = { ...prevFilter, ...newFilterBy };
		bookService.setFilterBy(newFilterBy);
		setFilterBy(newFilterBy);
	}

	// console.log('render')
	if (!books) return <div>Loading...</div>;

	return (
		<section className="books-index">
			<BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
			<section className="container">
				<button className="edit-link">
					<Link to="/book/add">Add Book</Link>
				</button>
			</section>
			<BookList books={books} onRemoveBook={onRemoveBook} />
		</section>
	);
}
