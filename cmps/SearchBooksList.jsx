export function SearchBooksList({ booksList, onSave }) {
	return (
		<ul className="google-search-list">
			{booksList.map((book) => (
				<li key={book.id}>
					<span>{book.title}</span>
					<button className="add-google-book-btn" onClick={() => onSave(book)}>
						+
					</button>
				</li>
			))}
		</ul>
	);
}
