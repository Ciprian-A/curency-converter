import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import Currency from './components/Currency';
import DateDisplay from './components/DateDisplay'
import axios from 'axios';


const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [toCurrency, setToCurrency] = useState();
  const [fromCurrency, setFromCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount]= useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency]= useState(true);
  
  const url = `https://api.exchangeratesapi.io/latest`;
  let toAmount, fromAmount, toRoundAmount, fromRoundAmount;

  if(amountInFromCurrency) {
    fromAmount = Math.max(0,amount);
    toAmount = amount * exchangeRate;
    toRoundAmount = toAmount.toFixed(4)
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
    fromRoundAmount = fromAmount.toFixed(4)
  }
  
  useEffect(() => {
    const fetchData = async() => {
      const result = await axios(url)
      const data = result.data;
      
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    }
    fetchData()
  }, [url]);

  useEffect(() => {
    const changedCurrency = async () => {

      if(fromCurrency != null && toCurrency != null){
        const result = await axios(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
        const data = result.data;
        setExchangeRate(data.rates[toCurrency])
      }
    }
    changedCurrency()
  }, [url, fromCurrency, toCurrency])

const handleFromAmountChange = (e)=> {
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}
const handleToAmountChange = (e)=> {
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}
  return (
    <div className={styles.App}>
     <h1>Choose a currency to convert</h1>
     <Currency 
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      handleChangeCurrency={e => setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}

      />

     <p>=</p>
     <Currency 
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      handleChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toRoundAmount}
      />
      <DateDisplay />
    </div>
  );
}

export default App;
