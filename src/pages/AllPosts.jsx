import React, { useState, useEffect,useRef,useCallback } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import appwriteService from "../appwrite/ConfigDb";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import PostPage from "../components/PostPage";
import Pagination from "../components/Pagination";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const[pageno,setPageno]=useState(1)
  const total_page=10;
  const[loading,setLoading]=useState(true)
const postperpg=10  //Thala for a reason.
const[postsOnpage,setPostsOnpage]=useState([])
  async function getPostdata(){
    try{
      const posts=await appwriteService.getPosts([])
            setLoading(true)
    // appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        // console.log(posts)
        setPosts(posts.documents);
        console.log(posts)
        if(pageno===1){
        setPostsOnpage(posts.documents.slice(0,postperpg));}
        setLoading(false)
      }
    // });
  }
  catch(err){
  console.log("posts not found"+err)
  }
  }
  
  useEffect(()=>{
    getPostdata()
  },[])
  // useEffect(()=>{
  //   postsOnpage=posts.slice(pageno*postperpg-postperpg,pageno*postperpg-1)
  //  },
  //  [])
 
  useEffect(()=>{
   setPostsOnpage(posts.slice(pageno*postperpg-postperpg,pageno*postperpg))
  },
  [pageno])

  const handlePageNoInc=()=>{
  if(pageno<=total_page && posts.length>=postperpg && postsOnpage.length===postperpg){
    setPageno(pageno+1)
  }
  }
  const handlePageNoDec=()=>{
    if(pageno>1){
      setPageno(pageno-1)
    }
    }
  
// const firstPostIndex=
  return (
    <div className="min-h-screen">
    {loading ? (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg font-medium text-slate-700">Loading posts...</div>
      </div>
    ):(
      <>
    <div className="flex w-[100%] justify-evenly items-start h-[80%] mt-32">
    <div>
    {postsOnpage.length>0 && <PostPage limitposts={postsOnpage}/>}
    </div>
    <div className="h-[100%] relative right-16 mt-4">
    <div className="bg-blue-400 text-black w-[250px] h-[250px]">
    <h2 className="text-xl font-bold ml-4 pt-4">Writing on Roc8?</h2>
    <ul className="list-none mt-16  ml-1.5">
    <li className="text-base font-medium mb-1.5">FAQs about writing</li>
    <li className="text-base font-medium mb-1.5">Guidlines to be followed</li>
    </ul>
    <Link to='/addposts'><button className="rounded-lg mt-4 ml-4 h-[40px] w-[115px] px-2 py-1 bg-black text-white text-sm">Start writing</button></Link>
    </div>
    </div>
    </div>
    <Pagination postsOnpage={postsOnpage} postsTotal={posts.length} postperpg={postperpg} handlePageNoDec={handlePageNoDec} handlePageNoInc={handlePageNoInc} pageno={pageno}/>
    </>)}
    </div>
  );

}

export default AllPosts;
