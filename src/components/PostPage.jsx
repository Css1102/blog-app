import React from 'react'
import PostCard from './PostCard'
const PostPage = ({limitposts}) => {
     console.log(limitposts)
  return (
    <div className="flex flex-col w-[60%] h-[100%] justify-start items-end ml-36">
     
    {limitposts?.map((post)=>(
      <div key={post.$id}  className='relative right-10 mt-4'>
      <PostCard{...post}/>
      </div>
    ))
    }
    {/* <div className="h-[1000px] w-[0.5px] bg-slate-600 "></div> */}
    </div>
  )
}

export default PostPage