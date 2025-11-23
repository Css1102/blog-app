import React from 'react'

function Pagination({postsOnpage,postsTotal,postperpg,handlePageNoDec,handlePageNoInc,pageno}) {
  return (
<div className="flex gap-4 mt-10">
  <button
    onClick={handlePageNoDec}
    className={`w-[80px] h-[40px] rounded-sm text-white px-3 py-1.5 ${
      pageno === 1 ? 'bg-slate-400' : 'bg-slate-900'
    }`}
  >
    Prev
  </button>
  <button
    onClick={handlePageNoInc}
    className={`w-[80px] h-[40px] rounded-sm text-white px-3 py-1.5 ${
      postsOnpage.length === postperpg && postsTotal % postperpg !== 0
        ? 'bg-slate-900'
        : 'bg-slate-400'
    }`}
  >
    Next
  </button>
</div>  )
}

export default Pagination