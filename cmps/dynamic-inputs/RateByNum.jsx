// export function RateByNum({ handleChange, rating }) {
// 	function onSetRating(newValue) {
// 		const target = { name: 'rating', value: +newValue };
// 		handleChange({ target });
// 	}

// 	return (
// 		<input
// 			name="rating"
// 			value={rating}
// 			onChange={(ev) => onSetRating(ev.target.value)}
// 			type="number"
// 		/>
// 	);
// }

export function RateByNum({ value, onChange, name, id }) {
	return (
		<input
			type="number"
			id={id}
			name={name}
			min="1"
			max="5"
			value={value}
			onChange={onChange}
		/>
	);
}
