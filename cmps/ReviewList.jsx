export function ReviewList({ reviews, removeReview }) {
	return (
		<section>
			<h2>Book Reviews</h2>
			<ul className="book-reviews container flex">
				{reviews.map((review) => (
					<li key={review.id}>
						<div>{review.fullname}</div>
						<p>{review.rating}</p>
						<div>{review.readAt}</div>
						<button onClick={() => removeReview(review.id)}>X</button>
					</li>
				))}
			</ul>
		</section>
	);
}
