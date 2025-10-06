export function BookPreview({ book }) {
	const { title, thumbnail, listPrice } = book;
	//console.log(book);
	return (
		<article className="book-preview">
			<h2>Title: {title}</h2>
			<h2>Price: {listPrice.amount}</h2>
			<img src={thumbnail} alt="Book Image" />
		</article>
	);
}
