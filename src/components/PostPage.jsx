import React from 'react'
import PostCard from './PostCard'
const PostPage = ({limitposts}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
    {limitposts?.map((post)=>(
      <div key={post.$id}  className=' mt-4'>
      <PostCard{...post}/>
      </div>
    ))
    }
    {/* <div className="h-[1000px] w-[0.5px] bg-slate-600 "></div> */}
    </div>
  )
}

export default PostPage