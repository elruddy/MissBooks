import { utilService } from '../services/util.service.js';
const { useState } = React;

export function AddReview({ onReviewSubmit }) {
	const [isReviewing, setIsReviewing] = useState(false);
	const [review, setReview] = useState({ fullname: '', rating: 5, readAt: '' });

	if (!isReviewing)
		return (
			<button onClick={() => setIsReviewing(!isReviewing)}>Add Review</button>
		);

	function onSubmit(ev) {
		ev.preventDefault();
		setIsReviewing(false);
		onReviewSubmit({ ...review, id: utilService.makeId() });
	}

	function handleChange({ target }) {
		const { type } = target;
		let { value, name: prop } = target;

		switch (type) {
			case 'range':
			case 'number':
				value = +value;
				break;

			case 'checkbox':
				value = target.checked;
				break;
		}

		setReview({ ...review, [prop]: value });
	}

	return (
		<section className="add-book-review">
			<h2>Add Book Review</h2>
			<form onSubmit={onSubmit}>
				<label className="bold-txt" htmlFor="fullname">
					Full Name:{' '}
				</label>
				<input
					onChange={handleChange}
					id="fullname"
					type="text"
					name="fullname"
					value={review.fullname}
				/>
				<label className="bold-txt" htmlFor="rating">
					Number of pages:{' '}
				</label>
				<input
					onChange={handleChange}
					id="rating"
					type="number"
					name="rating"
					value={review.rating}
				/>

				<label className="bold-txt" htmlFor="readAt">
					read At:{' '}
				</label>
				<input
					onChange={handleChange}
					id="readAt"
					type="date"
					name="readAt"
					value={review.readAt}
				/>

				<button type="submit">Save</button>
				<button type="button" onClick={() => setIsReviewing(!isReviewing)}>
					Cancel
				</button>
			</form>
		</section>
	);
}
