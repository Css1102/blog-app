import React, { useState, useEffect,useRef,useCallback } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import appwriteService from '../appwrite/ConfigDb.js'
import {jwtDecode} from "jwt-decode";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import PostPage from "../components/PostPage";
import Pagination from "../components/Pagination";
import SearchBar from '../components/SearchBar'
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { FilterIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ListRestart } from 'lucide-react';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const[reset,setReset]=useState(false)
  const [filteredPosts, setFilteredPosts] = useState([]);
  const tagList=["Trading", "ETF", "Mutual Funds", "IPO", "Stocks", "Business","Personal Finance"]
  const[pageno,setPageno]=useState(1)
  const total_page=10;
  const[section,setSection]=useState((1))
  const [activeFilter, setActiveFilter] = useState(null);
  const[loading,setLoading]=useState(true)
  const[dropdownOpen,setDropdownOpen]=useState(false)
  const[tagListOpen,setTagListOpen]=useState(false)
  const filterRef=useRef(null);
  const tagRef=useRef(null);
     const userData = useSelector((state) => state.auth.userData);
     const userId=userData.$id===undefined ? userData.userData.$id:userData.$id;
     const jwtFromState=useSelector((state)=>state.auth.jwt)
   const[searchBarEmpty,setSearchBarEmpty]=useState(true)
   const bottomRef=useRef(null)
const postperpg=9;
const[postsOnpage,setPostsOnpage]=useState([])

useEffect(() => {
  if (jwtFromState) {
    const { exp } = jwtDecode(jwtFromState);
    if (Date.now() >= exp * 1000) {
      appwriteService.clearJWT();
      dispatch(logout());
      toast.error("Session expired, please log in again.");
      navigate("/login");
    } else {
      appwriteService.setJWT(jwtFromState);
    }
  }
}, [jwtFromState]);async function getPostdata() {
  try {
    setLoading(true);
    const posts = await appwriteService.getPosts(userId);
    if (posts) {
      setPosts(posts.documents);
      console.log("User posts:", posts.documents);

      if (pageno === 1) {
        setPostsOnpage(posts.documents.slice(0, postperpg));
      }
    }

    setLoading(false);
  } catch (err) {
    console.log("Posts not found:", err);
    setLoading(false);
  }
}  
  useEffect(()=>{
    getPostdata()
  },[])

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target) && activeFilter===null) {
        setDropdownOpen(false);
              setReset(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeFilter]);

  const filterByUpvotes=()=>{
  if(activeFilter==="upvotes"){
  setActiveFilter(null);
  setFilteredPosts([]);
  }
  else{
  const sorted=[...posts].sort((a,b)=>b.Upvotes-a.Upvotes)
  setFilteredPosts(sorted);
  setActiveFilter("upvotes");
  setPageno(1);
  }
  }
  const filterByLatest = () => {
  if (activeFilter === "latest") {
    setActiveFilter(null);
    setFilteredPosts([]);
  } else {
    const sorted = [...posts].sort(
      (a,b) => parseDate(b.Publish_Date) - parseDate(a.Publish_Date)
    );
    setFilteredPosts(sorted);
    setActiveFilter("latest");
    setPageno(1);
  }
};
const filterByTagName=(tag)=>{
console.log(tag)
setTagListOpen(true)
if(activeFilter===`tag-${tag}`){
setActiveFilter(null)
setFilteredPosts([])

}
else{
const filteredByTag=posts.filter((post)=>post.tag===tag)
setFilteredPosts(filteredByTag);
setActiveFilter(`tag-${tag}`);
setPageno(1)
}
} 
function parseDate(dateStr){
const[day,month,year]=dateStr.split("-");
return new Date(`${year}-${month}-${day}`)
}
useEffect(() => {
  const observer = new IntersectionObserver(
 (enteries)=>{
  const first=enteries[0];
  if(first.isIntersecting){
  setSection((no)=>no+1)
  }
 }
  );

  if (bottomRef.current) {
    observer.observe(bottomRef.current);
  }

  return () => {
    if (bottomRef.current) {
      observer.unobserve(bottomRef.current);
    }
  };
}, [bottomRef]);


useEffect(()=>{
const handleClickOutside=(event)=>{
if((tagRef.current && !tagRef.current.contains(event.target) && !event.target.closest(".tag-toggle") && activeFilter.slice(0,3)!=='tag')){
  setTagListOpen(false)
}
}
 document.addEventListener("mousedown",handleClickOutside)

 return(()=>{
document.removeEventListener("mousedown",handleClickOutside)
 })
},[activeFilter])
  useEffect(()=>{
   setPostsOnpage(posts.slice(pageno*postperpg-postperpg,pageno*postperpg))
  },
  [pageno])
const handleReset=()=>{
  setReset((prev)=>!prev)
 setActiveFilter(null);
 setFilteredPosts([...posts])
 setPageno(1)
 
}
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
  //  function filterByUpvotes(){
  // const filteredPosts=
  //  }
    const handleDropdown=()=>{
    setDropdownOpen((prev)=>!prev)
    }
    // useEffect(()=>{
    // if(!dropdownOpen){
    // setActiveFilter(null)
    // setPageno(1);
    // setFilteredPosts([])
    // }
    // },[dropdownOpen])
    useEffect(()=>{
     setTagListOpen(false)
    },[dropdownOpen])
    const handleTagOpen=(e)=>{
       e.stopPropagation();
    setTagListOpen((prev)=>!prev)
    }
const handleSearch = (query) => {
if (!query.trim()) {
  setFilteredPosts([]);
  setSearchBarEmpty(true)
  setPageno(1);
  return;
}
  if(query){
  setSearchBarEmpty(false)
  }
  const lowerQuery = query.toLowerCase();
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.Author.toLowerCase().includes(lowerQuery) ||
    post.Publish_Date.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery)
  );
  setFilteredPosts(filtered);
};
useEffect(() => {
let source;

  if (activeFilter || !searchBarEmpty) {
    source = filteredPosts;
    if (filteredPosts.length === 0) {
      setPostsOnpage([]);
      return;             
    }
  }     else {
    source = posts;
  }
    const start = (pageno - 1) * postperpg;
  const end = start + postperpg;
  setPostsOnpage(source.slice(start, end));
}, [pageno, posts, filteredPosts,searchBarEmpty]);
return (
<div className="relative min-h-screen flex flex-col overflow-auto"> {loading ? 
( <div className="flex justify-center items-center h-full"> 
<div className="text-lg font-medium text-slate-700">Loading posts...</div> 
</div> ) :
 ( <> <div>
   <div className='flex mt-32 justify-between gap-4 items-center'> 
    <div className="relative lg:left-64" ref={filterRef}>
       <button onClick={handleDropdown}
        className="w-32 h-12 rounded-full bg-white text-black flex justify-evenly items-center px-3 py-1 shadow-md" > 
        <FilterIcon className={`w-4 h-4 ${activeFilter!==null && !reset?"fill-black":""}`} /> 
        <span>Filter by</span> </button> 
        {dropdownOpen && ( <ul className="absolute top-full left-0 mt-2 w-40 rounded-lg shadow-lg bg-white z-10"> 
          <li onClick={()=>filterByUpvotes()} className={`px-3 py-2 border-b border-slate-300 cursor-pointer
            ${activeFilter==="upvotes"? "bg-indigo-100 font-semibold":"hover:bg-slate-100"}`}> Upvotes </li>
             <li onClick={filterByLatest} className={`px-3 py-2 border-b border-slate-300 cursor-pointer ${activeFilter==="latest"? "bg-indigo-100 font-semibold":"hover:bg-slate-100"}`}> Latest </li> <li className="relative px-3 py-2 hover:bg-slate-100 cursor-pointer flex items-center justify-between"> <span className='ml-12'>Tags</span> <ChevronRight onClick={handleTagOpen} className={`tag-toggle w-4 h-4 cursor-pointer ${tagListOpen?"rotate-90":""}`} /> {tagListOpen && ( <div ref={tagRef}> <ul className="absolute top-0 left-full ml-2 w-32 rounded-lg shadow-lg bg-white z-50"> {tagList.map((tag, idx) => ( <li key={idx} onClick={()=>filterByTagName(tag)} className={`px-3 py-2 border-b border-slate-300 ${ activeFilter === `tag-${tag}` ? "bg-indigo-100 font-semibold" : "hover:bg-slate-100"} cursor-pointer`} > {tag} </li> ))} </ul> </div> )} </li> <li onClick={handleReset} className={`relative px-3 py-2 ${reset && activeFilter===null?"bg-indigo-100 font-semibold":"hover:bg-slate-100"} cursor-pointer flex items-center justify-around`}> <ListRestart className="w-4 h-4"/> <span className="mr-10">Reset</span> </li> </ul> )} </div> <SearchBar onSearch={handleSearch}/> </div> <div className="pt-32 pb-20 min-h-[300px]" ref={bottomRef}> {postsOnpage.length > 0 ? ( <PostPage limitposts={postsOnpage} /> ) : ( <div className="text-center text-slate-500 text-lg font-medium py-10"> {activeFilter || !searchBarEmpty ? "No posts found for your selection." : "No posts available yet. Start by creating your first post!"} </div> )} </div> </div> </> )} {/* Always show pagination */}
 {!loading && postsOnpage.length>0 && 
 <div className="my-8 flex justify-center"> 
 <Pagination postsOnpage={postsOnpage} 
 postsTotal={filteredPosts? filteredPosts.length:posts.length} 
 postperpg={postperpg} handlePageNoDec={handlePageNoDec} 
 handlePageNoInc={handlePageNoInc} pageno={pageno} /> </div>} 
 \</div> );

}

export default AllPosts;
