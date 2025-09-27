import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSelectBookId }) {
    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        {/* <button onClick={ev => onRemoveBook(book.id, ev)}>Remove</button> */}
                        <button onClick={() => onSelectBookId(book.id)} >Details</button>
                    </section>
                </li>
            )}
        </ul>
    )

}