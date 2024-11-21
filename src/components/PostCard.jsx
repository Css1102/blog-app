import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/ConfigDb.js";
import eye_img from '../assets/eye.png'
import thumb_img from '../assets/thumbs-up.png'
import { useSelector } from "react-redux";
function PostCard({ $id, title, featuredImage,Author,Publish_Date }) {
  let[count,setCount]=useState(105);
  const stateLike=useSelector((state)=>state.auth?.likeCount)
const handleInc=()=>{
  console.log("Inside handle function")
   console.log(count)
setCount(count+1)
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

  // useEffect(()=>{
  // getDate();
  // },[])
  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-[1020px] bg-white max-h-[200px] flex justify-evenly items-center">
      <div className="w-[850px] h-[100%]">
      <p className="text-base font-extralight text-slate-800 ml-48 mt-2">{Author}</p>
      <p className="text-xl max-h-[70px] text-left font-bold mt-6 text-slate-900 w-full ml-[240px]">{title}</p>
      {console.log(Publish_Date?.substring(0,2))}
      <div className="flex justify-between item-center w-[100px] h-[20px] mt-10 ml-60">
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 64 64">
      <path fill="#FFC017" d="m39.637 40.831-5.771 15.871a1.99 1.99 0 0 1-3.732 0l-5.771-15.87a2.02 2.02 0 0 0-1.194-1.195L7.298 33.866a1.99 1.99 0 0 1 0-3.732l15.87-5.771a2.02 2.02 0 0 0 1.195-1.194l5.771-15.871a1.99 1.99 0 0 1 3.732 0l5.771 15.87a2.02 2.02 0 0 0 1.194 1.195l15.871 
      5.771a1.99 1.99 0 0 1 0 3.732l-15.87 
      5.771a2.02 2.02 0 0 0-1.195 1.194"></path>
      </svg> */}
      <p className="text-base font-extralight text-slate-800 text-nowrap mr-1.5">{getDate(Publish_Date?.substring(3,5))+" " + Publish_Date?.substring(0,2)+ ", "+Publish_Date?.substring(6)}</p>
    <img src={eye_img} alt="" className="mr-2 ml-2" />
<button onClick={handleInc} className="text-base font-extralight text-slate-800">{count}</button>
<img src={thumb_img} alt="" className="ml-4 mr-2" />
<p className="text-base font-extralight text-slate-800">{stateLike}</p>
      </div>
      </div>
      <div className="w-[400px] relative left-80">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-[120px] w-[400px]"
          />
   </div>
   <hr className="mt-60 w-[730px] bg-slate-600" />
      </div>
    </Link>
  );
}

export default PostCard;
