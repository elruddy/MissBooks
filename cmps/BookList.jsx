import { BookPreview } from './BookPreview.jsx';
const { Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
	return (
		<ul className="book-list container">
			{books.map((book) => (
				<Link to={`/book/${book.id}`}>
					<li key={book.id}>
						<BookPreview book={book} />
						<section className="book-actions">
							<i
								className="fas fa-trash"
								onClick={(ev) => onRemoveBook(book.id, ev)}
							></i>

							<Link to={`/book/${book.id}`}>
								<i className="fas fa-info-circle"></i>
							</Link>

							<Link to={`/book/edit/${book.id}`}>
								<i className="fas fa-edit"></i>
							</Link>
						</section>
					</li>
				</Link>
			))}
		</ul>
	);
}
