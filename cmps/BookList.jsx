import { BookPreview } from './BookPreview.jsx';
const { Link } = ReactRouterDOM;

export function BookList({ books, onRemoveBook }) {
	return (
		<ul className="book-list container">
			{books.map((book) => (
				<li key={book.id}>
					<BookPreview book={book} />
					<section>
						<button onClick={(ev) => onRemoveBook(book.id, ev)}>Remove</button>
						<button>
							<Link to={`/book/${book.id}`}>Details</Link>
						</button>
						<button>
							<Link to={`/book/edit/${book.id}`}>Edit</Link>
						</button>
					</section>
				</li>
			))}
		</ul>
	);
}
