// export function RateBySelect({ handleChange, rating }) {
// 	function onSetSelect(selectedValue) {
// 		const target = { name: 'rating', value: +selectedValue };
// 		handleChange({ target });
// 	}

// 	return (
// 		<select value={rating} onChange={(ev) => onSetSelect(ev.target.value)}>
// 			<option value="1">1</option>
// 			<option value="2">2</option>
// 			<option value="3">3</option>
// 			<option value="4">4</option>
// 			<option value="5">5</option>
// 		</select>
// 	);
// }

export function RateBySelect({ value, onChange, name, id }) {
	return (
		<select id={id} name={name} value={value} onChange={onChange}>
			<option value="">Select rating</option>
			{[1, 2, 3, 4, 5].map((num) => (
				<option key={num} value={num}>
					{num}
				</option>
			))}
		</select>
	);
}
