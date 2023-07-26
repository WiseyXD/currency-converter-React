export default function CurrencyRow(props) {
	const {
		min,
		readOnly,
		currencyOptions,
		onChange,
		onAmountChange,
		amount,
		result,
		defaultValue,
		placeHolder,
	} = props;
	return (
		<div className="row">
			<input
				type="number"
				min={min}
				readOnly={readOnly}
				className="form-input"
				onChange={(e) => onAmountChange(e)}
				value={amount}
				placeholder={placeHolder}
			/>
			<select
				className="form-select"
				id="currency"
				name="currency"
				onChange={(e) => onChange(e)}
				value={defaultValue}
			>
				{currencyOptions.map((options) => {
					return (
						<option key={options} value={options}>
							{options}
						</option>
					);
				})}
			</select>
		</div>
	);
}
