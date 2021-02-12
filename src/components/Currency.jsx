import React from 'react'
import '../components/Currency.module.scss';

 const Currency = (props) => {
   const { 
     currencyOptions,
     selectedCurrency,
     handleChangeCurrency,
     amount,
     onChangeAmount
    } = props;
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={handleChangeCurrency}>
      {currencyOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
        
      </select>
    </div>
  )
}
export default Currency;