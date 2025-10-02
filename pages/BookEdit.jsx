import { bookService } from '../services/book.service.js';

const { useNavigate, useParams } = ReactRouterDOM;
const { useState, useEffect } = React;

export function BookEdit() {
	const navigate = useNavigate();
	const params = useParams();

	const [book, setBook] = useState(bookService.getEmptybook());

	useEffect(() => {
		if (!params.bookId) setBook(bookService.getEmptybook());
		else loadBook(params.bookId);
	}, [params.bookId]);

	function loadBook(bookId) {
		bookService
			.get(bookId)
			.then((book) => setBook(book))
			.catch((err) => console.log('err:', err));
	}

	function onSave(ev) {
		ev.preventDefault();
		if (!book.title || !book.listPrice.amount) {
			console.log('Please enter amount and title');
			return;
		}
		bookService
			.save(book)
			.then(() => console.log('Book has successfully saved!'))
			.catch(() => console.log(`couldn't save book`))
			.finally(() => onCancelEdit());
	}

	function onCancelEdit() {
		navigate('/book');
	}

	function getValue(target) {
		const { type } = target;
		let { value } = target;

		switch (type) {
			case 'range':
			case 'number':
				value = +value;
				break;

			case 'checkbox':
				value = target.checked;
				break;
		}

		return value;
	}

	function handleChange({ target }) {
		const { name: prop } = target;
		const value = getValue(target);
		setBook({ ...book, [prop]: value });
	}

	function handleChangeListPrice({ target }) {
		const { name: prop } = target;
		const value = getValue(target);

		book.listPrice = { ...book.listPrice, [prop]: value };
		setBook({ ...book });
	}

	return (
		<section className="book-edit">
			<h2>Add Book</h2>
			<form onSubmit={onSave}>
				<label className="bold-txt" htmlFor="title">
					Title:{' '}
				</label>
				<input
					onChange={handleChange}
					value={book.title}
					id="title"
					type="text"
					name="title"
				/>

				<label className="bold-txt" htmlFor="authors">
					Authors:{' '}
				</label>
				<input
					onChange={handleChange}
					value={book.authors}
					id="authors"
					type="text"
					name="authors"
				/>

				<label className="bold-txt" htmlFor="price">
					Price:{' '}
				</label>
				<input
					onChange={handleChangeListPrice}
					value={book.listPrice.amount}
					id="price"
					type="number"
					name="amount"
				/>

				<label className="bold-txt" htmlFor="description">
					Description:{' '}
				</label>
				<input
					onChange={handleChange}
					value={book.description}
					id="description"
					type="text"
					name="description"
				/>

				<label className="bold-txt" htmlFor="pages">
					Number of pages:{' '}
				</label>
				<input
					onChange={handleChange}
					value={book.pageCount}
					id="pages"
					type="number"
					name="pageCount"
				/>

				<label className="bold-txt" htmlFor="isOnSale">
					On Sale:{' '}
				</label>
				<input
					onChange={handleChangeListPrice}
					checked={book.listPrice.isOnSale}
					id="isOnSale"
					type="checkbox"
					name="isOnSale"
				/>

				<button type="submit">Save</button>
				<button type="button" onClick={onCancelEdit}>
					Cancel
				</button>
			</form>
		</section>
	);
}
