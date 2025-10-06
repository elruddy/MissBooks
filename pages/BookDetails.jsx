import { bookService } from '../services/book.service.js';
import { utilService } from '../services/util.service.js';
import { LongTxt } from '../cmps/LongTxt.jsx';
import { AddReview } from '../cmps/AddReview.jsx';

const { useState, useEffect } = React;
const { useParams, useNavigate, Link } = ReactRouterDOM;

export function BookDetails() {
	const [book, setBook] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		// to ensure we see loading
		setBook(null);

		loadBook(params.bookId);
	}, [params.bookId]);

	function loadBook(bookId) {
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

	function onBack() {
		navigate('/book');
	}

	function onReviewSubmit(review) {
		if (!book.reviews) book.reviews = [];

		book.reviews.push(review);
		bookService
			.save(book)
			.then((book) => setBook({ ...book }))
			.catch((err) => console.log('failed to save review'));
	}

	function removeReview(id) {
		const idToRemove = book.reviews.findIndex((review) => review.id === id);
		book.reviews.splice(idToRemove, 1);
		bookService
			.save(book)
			.then((book) => setBook({ ...book }))
			.catch((err) => console.log('failed to remove review'));
	}

	if (!book) return <div>Loading Details...</div>;

	const { title, description } = book;
	const hasReviews = book.reviews && !!book.reviews.length;
	return (
		<section className="book-details container flex flex-column align-center ">
			<h1>Book Title: {title}</h1>
			<span>{getBookAge()}</span>
			<h4>{bookReadingLevel()}</h4>
			<h1>
				Book Price:{' '}
				<span className={colorPrice()}> {book.listPrice['amount']}</span>
			</h1>

			<LongTxt txt={description} length={25} />
			<img src={book.thumbnail} alt="Book Image" />
			{book.listPrice.isOnSale && <span>On Sale</span>}
			<button onClick={onBack}>Back</button>

			<AddReview onReviewSubmit={onReviewSubmit} />

			{hasReviews && (
				<section>
					<h2>Book Reviews</h2>
					<ul className="book-reviews container flex">
						{book.reviews.map((review) => (
							<li key={review.id}>
								<div>{review.fullname}</div>
								<p>{review.rating}</p>
								<div>{review.readAt}</div>
								<button onClick={() => removeReview(review.id)}>X</button>
							</li>
						))}
					</ul>
				</section>
			)}

			<section className="page-btns">
				<button className="page-btn">
					<Link to={`/book/${book.prevBookId}`}>Prev</Link>
				</button>
				<button className="page-btn">
					<Link to={`/book/${book.nextBookId}`}>Next</Link>
				</button>
			</section>
		</section>
	);
}
