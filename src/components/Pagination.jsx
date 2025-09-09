import React from 'react'

function Pagination({postsOnpage,postsTotal,postperpg,handlePageNoDec,handlePageNoInc,pageno}) {
  return (
<div className="w-[500px] h-[40px] mt-[100px] mb-[50px] ml-[500px] flex justify-evenly items-center">
<button onClick={handlePageNoDec} className={`w-[80px] h-[100%] rounded-sm text-white px-3 py-1.5 ${pageno===1?'bg-slate-400':'bg-slate-900'} `}>Prev</button>
<button onClick={handlePageNoInc} className={`w-[80px] h-[100%] rounded-sm text-white px-3 py-1.5 ${(postsOnpage.length===postperpg && postsTotal%postperpg!==0)?'bg-slate-900':'bg-slate-400'}`}>Next</button>
</div>
  )
}

export default Pagination