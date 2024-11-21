import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Container from "../components/container/Container";
import appwriteService from "../appwrite/ConfigDb";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import eye_img from '../assets/eye.png'
import thumb_img from '../assets/thumbs-up.png'
import trash_icon from '../assets/trash-2.png'
import trending_icon from '../assets/trending-up.png'
import { useSelector } from "react-redux";
import thumbLike_img from '../assets/thumbs-up (1).png'
function Post() {
  const [post, setPost] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const stateLike=useSelector((state)=>state.auth?.likeCount)
  const[likes,setLikes]=useState(stateLike)
  const[isLiked,setIsLiked]=useState(false)

  const funcLike=()=>{
  console.log('like clicked by me')
  if(!isLiked){
  setLikes(likes+1)
  setIsLiked((prev)=>!prev)
  }
  else{
  setLikes(likes-1)
  setIsLiked((prev)=>!prev)
  }
  }
  useEffect(() => {
    if (slug) {
    console.log(slug)
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          console.log(post)
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const confm=confirm("Are you sure you want to delete the post")
    if(confm){
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  }
  };
  return post ? (
      <div className="w-full p-4">
        <div className="w-full flex flex-col justify-between items-center mt-20">
        <h1 className="text-3xl font-bold text-slate-600  max-w-[700px] text-left text-wrap">{post.title}</h1>
        <div className="mt-8 flex w-[50px] h-[15px] justify-between items-center text-left mr-[650px]">
        <p className="text-sm font-light text-slate-800 text-nowrap">{post?.Author}</p>
        <p className="text-base font-extralight text-slate-500 ml-1.5">Follow</p>
        </div>
        <div className="mt-2 flex justify-between items-center text-left mr-[540px]">
        <p className="text-base font-extralight text-slate-500">5 min read .</p>
        <p className="text-base font-extralight text-slate-500 ml-1">{post?.Publish_Date}</p>
        </div>
        <div className="relative bottom-10 left-60 text-right h-[40px] w-[170px] bg-slate-900 text-white  rounded-xl">
        <Link to={`/editposts/${post.$id}`}>
                <button  className="h-[100%] w-[100%] flex justify-evenly items-center">
                  <img src={trending_icon} alt="" className="" />
                  <p className="text-base font-bold">Edit your Post</p>
                </button>
                </Link>
        </div>
        <div className="mt-4 flex justify-between items-center mr-[610px]">
        <img src={eye_img} alt="" className="" />
        <p className="text-base font-extralight text-slate-500 ml-1">100</p>
        {isLiked? <img src={thumbLike_img} alt="" className="ml-4" />:<img src={thumb_img} alt="" className="ml-4" />}
        <button onClick={()=>funcLike()} className=""><p className="text-base font-extralight text-slate-500 ml-1">{likes}</p></button>
        </div>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="h-[400px] w-[700px] mt-4 rounded-xl"
          />
       {/* {isAuthor && ( */}
          {/* )}  */}
        <div className="mb-6 w-full mt-8">
          <div className="browser-css text-slate-500 text-left max-w-[764px] ml-60">
            {/* The parse comes from the html react parser and it is used to convert the inline html components
    of the tinyMCE editor to jsx format in order to be rendered by react. */}
            {parse((post.content))}
          </div>
          
        </div>
        <div className="text-center h-[40px] w-[150px] bg-red-600 text-white  rounded-xl">
        <button className=" h-[100%] w-[100%] flex justify-evenly items-center" onClick={deletePost}>
        <img src={trash_icon} alt="" className="relative left-4" />
        <p className="text-base font-bold">Delete</p>
        </button>

        </div>

        {/* <div className="absolute-right-6 top-6 ml-3">
              <Link to={`/editposts/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3 ml-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-green-500" onClick={deletePost}>
                Delete
              </Button>
            </div> */}

        </div>
        </div>
  ) : null;
}

export default Post;
