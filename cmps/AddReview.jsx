import { utilService } from '../services/util.service.js';
import { RateByNum } from './dynamic-inputs/RateByNum.jsx';
import { RateBySelect } from './dynamic-inputs/RateBySelect.jsx';
import { RateByStars } from './dynamic-inputs/RateByStars.jsx';

const { useState } = React;

export function AddReview({ onReviewSubmit }) {
	const [isReviewing, setIsReviewing] = useState(false);
	const [review, setReview] = useState({ fullname: '', rating: 5, readAt: '' });
	const [inputType, setInputType] = useState('num');

	function handleRatingChange(valueOrEvent) {
		let value;
		if (
			valueOrEvent &&
			valueOrEvent.target &&
			valueOrEvent.target.value !== undefined
		) {
			value = valueOrEvent.target.value;
		} else {
			value = valueOrEvent;
		}
		setReview((prev) => ({ ...prev, rating: value }));
	}

	const commonProps = {
		value: review.rating,
		onChange: handleRatingChange,
		name: 'rating',
		id: 'rating',
	};

	function renderRatingInput() {
		switch (inputType) {
			case 'select':
				return <RateBySelect {...commonProps} />;
			case 'stars':
				return <RateByStars {...commonProps} />;
			default:
				return <RateByNum {...commonProps} />;
		}
	}

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
					rating type:{' '}
				</label>

				<div className="rating-type">
					<label>
						<input
							type="radio"
							name="inputType"
							value="num"
							checked={inputType === 'num'}
							onChange={(e) => setInputType(e.target.value)}
						/>
						Number
					</label>

					<label>
						<input
							type="radio"
							name="inputType"
							value="select"
							checked={inputType === 'select'}
							onChange={(e) => setInputType(e.target.value)}
						/>
						Select
					</label>

					<label>
						<input
							type="radio"
							name="inputType"
							value="stars"
							checked={inputType === 'stars'}
							onChange={(e) => setInputType(e.target.value)}
						/>
						Stars
					</label>
				</div>
				{renderRatingInput()}

				{/* <input
					onChange={handleChange}
					id="rating"
					type="number"
					name="rating"
					value={review.rating}
				/> */}

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
