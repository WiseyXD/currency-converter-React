import "./App.css";
import { useState, useEffect } from "react";
import CurrencyRow from "./Components/CurrencyRow";
function App() {
	let [currencyOptions, setCurrencyOptions] = useState([]);
	let [fromCurrency, setFromCurrency] = useState("INR");
	let [toCurrency, setToCurrency] = useState("EUR");
	let [amount, setAmount] = useState();
	let [result, setResult] = useState(null);
	const API_KEY = "403a8a4683dd6da235464335";
	console.log(toCurrency, fromCurrency);

	useEffect(() => {
		getExchangeRate();
	}, []);

	async function getExchangeRate() {
		const resp = await fetch(
			`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/INR`
		);
		const data = await resp.json();
		setCurrencyOptions([...Object.keys(data.conversion_rates)]);
	}

	async function getResult(fromCurrency, toCurrency, amount) {
		const resp = await fetch(
			`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
		);
		const data = await resp.json();
		setResult(data.conversion_result);
		console.log(result);
	}

	return (
		<div className="container">
			<div className="card">
				<h1 className="heading">Currency Converter</h1>
				<CurrencyRow
					default="FROM"
					min="1"
					currencyOptions={currencyOptions}
					onChange={(e) => setFromCurrency(e.target.value)}
					onAmountChange={(e) => setAmount(e.target.value)}
					amount={amount}
					defaultValue={fromCurrency}
					placeHolder={"Enter Amount"}
				/>
				<div>
					<button
						onClick={() =>
							getResult(fromCurrency, toCurrency, amount)
						}
					>
						=
					</button>
				</div>
				<CurrencyRow
					readOnly="true"
					currencyOptions={currencyOptions}
					onChange={(e) => setToCurrency(e.target.value)}
					amount={result}
					defaultValue={toCurrency}
				/>
			</div>
		</div>
	);
}

export default App;
