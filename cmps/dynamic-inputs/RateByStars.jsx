// export function RateByStars({ rating, handleChange }) {
// 	function onSetRating(rate) {
// 		if (!isEditable) return;
// 		const target = { name: 'rating', value: rate };
// 		handleChange({ target });
// 	}

// 	const isEditable = typeof handleChange === 'function';
// 	const editClass = isEditable ? 'edit' : '';

// 	return (
// 		<div className={`star-rating ${editClass}`}>
// 			{[...Array(5)].map((_, idx) => (
// 				<span
// 					key={idx}
// 					className={`star ${idx < rating ? 'on' : 'off'}`}
// 					onClick={() => onSetRating(idx + 1)}
// 				>
// 					&#9733;
// 				</span>
// 			))}
// 		</div>
// 	);
// }

export function RateByStars({ value, onChange, name }) {
	return (
		<div className="stars">
			{[1, 2, 3, 4, 5].map((num) => (
				<span
					key={num}
					onClick={() => onChange(num)}
					style={{
						cursor: 'pointer',
						fontSize: '1.5em',
						color: num <= value ? 'gold' : 'gray',
					}}
				>
					★
				</span>
			))}
		</div>
	);
}
