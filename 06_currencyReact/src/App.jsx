import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  {InputBox}  from './component/index.js'
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
  const[amount,setAmount]=useState(0)
  const[from,setFrom]=useState('usd');
  const[to,setTo]=useState('inr')
  const[convertedAmount,setconvertedAmount]=useState(0);
const CurrencyInfo=useCurrencyInfo(from);
const options=Object.keys(CurrencyInfo)
const swap=()=>{
  setFrom(to)
  setTo(from)
  setconvertedAmount(amount)
  setAmount(convertedAmount)
}
const convert=()=>{
setconvertedAmount(amount*CurrencyInfo[to])
}
  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{backgroundImage: 'url(https://images.pexels.com/photos/47344/dollar-currency-money-us-dollar-47344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
          <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30'>

          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
         <div className="w-full mb-1">
         <InputBox
        label="from"
        amount={amount}
        currencyOptions={options}
        onCurrencyChange={(currency)=>setFrom(currency)}
        onAmountChange={(amount)=>setAmount(amount)}
        selectedCurrency={from}
          />
      </div>
      <div className="relative w-full h-0.5">
        <button
        className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md
        bg-blue-600 text-white px-2 py-0.5'
        onClick={swap}

        >Swap</button>
      </div>
      <div className="w-full mb-1">
         <InputBox
        label="to"
        currencyOptions={options}
        amount={convertedAmount}
        onCurrencyChange={(currency)=>setTo(currency)}
        onAmountChange={(amount)=>setAmount(amount)}
        selectedCurrency={to}
        amountDisabled
          />
      </div>
      <button
      type="submit"
      className='w-full bg-blue-500 text-white py-4 px-3 rounded-lg'
      >Convert {from.toUpperCase()} to {to.toUpperCase()}
      </button>
      </form>
    </div>
    </div>
    </div>
  )
}

export default App
