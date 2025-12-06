import React from 'react'

const Services = () => {
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 mt-8">
      {/* Card 1 */}
      <div className="w-full sm:w-1/2 lg:w-1/3 rounded-xl flex flex-col items-center p-6 bg-slate-100 shadow-md">
        <img
          src="https://lemonn.co.in/images/stock-trend.svg"
          alt="Latest Trends"
          className="w-20 h-20"
        />
        <h4 className="mt-4 text-xl sm:text-2xl font-medium text-slate-900 text-center">
          Latest Trends
        </h4>
        <p className="mt-2 text-sm sm:text-lg font-light text-slate-700 text-center leading-relaxed">
          Get real time updates regarding the trends and patterns of the market from our leading experts.
        </p>
      </div>

      {/* Card 2 */}
      <div className="w-full sm:w-1/2 lg:w-1/3 rounded-xl flex flex-col items-center p-6 bg-slate-100 shadow-md">
        <img
          src="https://lemonn.co.in/images/fo-bar.svg"
          alt="IPO Review"
          className="w-20 h-20"
        />
        <h4 className="mt-4 text-xl sm:text-2xl font-medium text-slate-900 text-center">
          IPO Review
        </h4>
        <p className="mt-2 text-sm sm:text-lg font-light text-slate-700 text-center leading-relaxed">
          Hit or a Miss? Get a detailed analysis of all the latest IPOs with key metrics and nuances considered.
        </p>
      </div>

      {/* Card 3 */}
      <div className="w-full sm:w-1/2 lg:w-1/3 rounded-xl flex flex-col items-center p-6 bg-slate-100 shadow-md">
        <img
          src="https://lemonn.co.in/images/ipos.svg"
          alt="Expert Guidance"
          className="w-20 h-20"
        />
        <h4 className="mt-4 text-xl sm:text-2xl font-medium text-slate-900 text-center">
          Expert Guidance
        </h4>
        <p className="mt-2 text-sm sm:text-lg font-light text-slate-700 text-center leading-relaxed">
          Elevate your financial planning with blogs from industry experts on investment strategies and assets like Mutual Funds, Stocks, and Real Estate.
        </p>
      </div>
    </div>
  )
}

export default Services
