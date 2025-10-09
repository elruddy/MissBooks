import { bookService } from '../services/book.service.js';
import { SearchBooksList } from './SearchBooksList.jsx';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { utilService } from '../services/util.service.js';

const { useState, useRef } = React;
const { useNavigate } = ReactRouter;

export function BookAdd() {
	const [booksList, setBooksList] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const handleSearchDebounce = useRef(utilService.debounce(handleSearch, 2000));

	function handleSearch(target) {
		bookService
			.getGoogleBooks(target.value)
			.then((books) => {
				setBooksList(books);
			})
			.finally(() => setIsLoading(false));
	}

	function onSave(book) {
		bookService
			.addGoogleBook(book)
			.then(() => showSuccessMsg('Book has successfully saved!'))
			.catch(() => showErrorMsg(`couldn't save book`))
			.finally(() => navigate('/book'));
	}

	function onSearch({ target }) {
		if (!target.value) {
			setBooksList([]); // clear the list when reset
			setIsLoading(false);
		}
		setIsLoading(true);
		handleSearchDebounce.current(target);
	}
	const inputRef = useRef(null);
	const handleReset = () => {
		inputRef.current.value = ''; // clears the input
		onSearch({ target: { value: '' } }); // also clears search results if needed
	};

	return (
		<div>
			<div>
				<h2>Add Book from Google</h2>
				<span className="bold-txt">Google Search: </span>
				<input
					ref={inputRef}
					onChange={onSearch}
					type="text"
					name="title"
					placeholder="Insert book name"
				/>
				<button onClick={handleReset}>Reset</button>
			</div>
			{isLoading && <div>Loading....</div>}
			{booksList && booksList.length > 0 && (
				<SearchBooksList booksList={booksList} onSave={onSave} />
			)}
		</div>
	);
}
