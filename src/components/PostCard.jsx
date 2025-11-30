import React,{useEffect,useState,useRef} from "react";
import { Link } from "react-router-dom";
import appwriteService from '../appwrite/ConfigDb.js'
import { useSelector } from "react-redux";
import { ArrowBigUp } from "lucide-react";
import { MoreHorizontal } from 'lucide-react'
function PostCard({ $id, title, featuredImage,Author,Publish_Date,Upvotes,tag }) {
  const[userHasUpvoted,setUserHasUpvoted]=useState(false)
    const userData = useSelector((state) => state.auth.userData);
    const userId=userData.$id===undefined ? userData.userData.$id:userData.$id;
    const userName=userData?.username===undefined ? userData?.userData?.username:userData?.username;

    const menuRef=useRef(null);
  const[threedotClick,setThreedotclick]=useState(false)
  useEffect(()=>{
  const checkUserupvoted=async()=>{
  const hasUserUpvoted=await appwriteService.upvoteSlug({userId,postId:$id})
  setUserHasUpvoted(hasUserUpvoted)
  }
  checkUserupvoted()
  },[])

  const handlesetThreedotclick=()=>{
    setThreedotclick((prev)=>!prev)
    }
  let month=undefined;
  const getDate=(str)=>{
  if(str==="01"){
  month="Jan";
  }
  else if(str==="02"){
    month="Feb";
    }
   else if(str==="03"){
      month="Mar";
      }
     else if(str==="04"){
        month="Apr";
        }
       else if(str==="05"){
          month="May";
          }
         else if(str==="06"){
            month="June";
            }
          else  if(str==="07"){
              month="July";
              }
            else  if(str==="08"){
                month="Aug";
                }
                else  if(str==="09"){
                  month="Sep";
                  }
  
              else  if(str==="10"){
                  month="Oct";
                  }
                else  if(str==="11"){
                    month="Nov";
                    }
                   else if(str==="12"){
                      month="Dec";
                      }

    return month;
  }
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      event.target instanceof Node &&
      !menuRef.current.contains(event.target)
    ) {
      setThreedotclick(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);    
  const handleDelete = async () => {
    const confm=confirm("Are you sure you want to delete the post")
    if(confm){
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  }
}

return (
  <div className="bg-white rounded-xl shadow-md p-4 ml-4 mt-20 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] hover:shadow-lg relative">
    {/* Image */}
    <Link to={`/posts/${$id}`}>
    <div className="w-[400px] mx-2 h-52 overflow-auto rounded-md">
      <img
        src={appwriteService.getFilePreview(featuredImage)}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>
    </Link>
    <button className='absolute 
    top-1 right-2        
    sm:top-2 sm:right-3  
    md:top-3 md:right-4  
    lg:top-0 lg:right-6
    px-3 py-1
    rounded-full
    bg-gradient-to-r from-indigo-600 to-purple-600
    text-white text-xs font-semibold
    shadow-md
    hover:shadow-lg hover:scale-105
    transition-all duration-200 ease-in-out2'>
    {tag}
    </button>

    <div className='relative'>
    <p className="text-sm text-slate-600 mt-3">{Author}</p>

     <div ref={menuRef}>
    {Author.replace(" ","").toLowerCase()===userName.replace(" ","").toLowerCase() && <div className="z-50" onClick={()=>handlesetThreedotclick()}>
    <MoreHorizontal className="absolute right-2 top-3 text-slate-700"/>
    </div>}
       {threedotClick && (
          <ul className="absolute top-0 right-0 w-32 rounded-lg shadow-lg bg-zinc-100 border border-slate-300 z-[100]">
            <Link to={`/editposts/${$id}`}>
            <li
              className="px-4 py-2 text-slate-700 hover:bg-yellow-500 hover:text-white cursor-pointer transition-colors"
            >
              Update
            </li>
            </Link>
            <li
              className="px-4 py-2 text-slate-700 hover:bg-red-500 hover:text-white cursor-pointer transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete clicked");
                handleDelete();
              }}
            >
              Delete
            </li>
          </ul>
        )}
    </div>

    </div>
        <Link to={`/posts/${$id}`}>
    <h2 className="text-lg font-semibold text-slate-900 mt-2 line-clamp-2">{title}</h2>
    <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
      <p>{getDate(Publish_Date?.substring(3, 5)) + " " + Publish_Date?.substring(0, 2) + ", " + Publish_Date?.substring(6)}</p>
      <div className="flex items-center gap-2">
       <ArrowBigUp className={`${userHasUpvoted?'text-orange-600':'text-slate-700}'}`}/>
        <p>{Upvotes}</p>
      </div>
    </div>
    </Link>
  </div>
  )}


export default PostCard;
