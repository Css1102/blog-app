import React from 'react'

const Services = () => {
  return (
<div className="w-full h-[300px] flex items-center justify-around">
<div className="h-[100%] w-1/4 rounded-xl flex flex-col items-center justify-evenly bg-slate-100">
<img src="https://lemonn.co.in/images/stock-trend.svg" alt="nhi mili" className="w-[100px] h-[100px]" />
<h4 className="mt-4 text-2xl font-medium text-slate-900">Latest Trends</h4>
<div className="mt-2 text-lg ml-6 font-light text-slate-700 text-left text-balance">Get real time update regarding the trends and patterns of the market from our leading experts.</div>
</div>
<div className="h-[100%] w-1/4 rounded-xl flex flex-col items-center justify-evenly bg-slate-100">
<img src="https://lemonn.co.in/images/fo-bar.svg" alt="nhi mili" className="w-[100px] h-[100px]" />
<h4 className="mt-4 text-2xl font-medium text-slate-900">IPO review</h4>
<div className="mt-2 text-lg font-light ml-4 text-slate-700 text-left text-balance">Hit or a Miss? Get a detailed analysis of All the latest IPOs with all the key metrics and nuances being considered</div>
</div>
<div className="h-[100%] w-1/4 rounded-xl flex flex-col items-center justify-evenly bg-slate-100">
<img src="https://lemonn.co.in/images/ipos.svg" alt="nhi mili" className="w-[100px] h-[100px]" />
<h4 className="mt-4 text-2xl font-medium text-slate-900">Expert Guidance</h4>
<div className="mt-2 text-lg font-light ml-4 text-slate-700 text-left text-balance">Elevate your financial planning with blogs from industry experts regarding Investment strategies and assets like Mutual Funds, Stocks and Real Estate</div>
</div>

</div>
  )
}

export default Services