import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Container from "../components/container/Container";
import appwriteService from "../appwrite/ConfigDb";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import trash_icon from '../assets/trash-2.png'
import trending_icon from '../assets/trending-up.png'
import { useSelector,useDispatch } from "react-redux";
import { ArrowBigUp } from "lucide-react";
import { Databases,Query,Client} from "appwrite";
import { upvoted } from "../store/authSlice";

import conf from '../conf/conf'
function Post() {
 const[post,setPost]=useState(null)
  const {slug} = useParams();
  const navigate = useNavigate();
  const[voteInProgress,setVoteInProgress]=useState(false)
  const userData = useSelector((state) => state.auth.userData);
  const userId=userData?.$id===undefined? userData?.userData?.$id:userData?.$id
  const dispatch=useDispatch()
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const[hasUpvoted,setHasUpvoted]=useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const client=new Client()
  .setEndpoint(conf.appwriteUrl).
    setProject(conf.appwriteProjectId)
  
const database=new Databases(client)
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
useEffect(() => {
  if (post) {
    setUpvoteCount(post.Upvotes || 0);
  }
}, [post]);

  useEffect(()=>{
    async function checkVoteStatus(){
        if (!post || !userId) return;
  const upvotedPost=await database.listDocuments(
       conf.appwriteDatabaseId,
       conf.appwriteCollection_three_Id,
             [
        Query.equal("postId", post.$id),
        Query.equal("userId", userId),
      ]
  )
  console.log(upvotedPost)
    setHasUpvoted(upvotedPost.total > 0);
}
  checkVoteStatus()
  },[post,userData])

const handleUpvoteToggle = async ({ postId, userId }) => {
  if (voteInProgress || !postId || !userId) return;

  setVoteInProgress(true);

  try {
    if (hasUpvoted) {
      await appwriteService.downVote({ postId, userId });
      setHasUpvoted(false);
      setUpvoteCount((count) => Math.max(count - 1, 0));
            dispatch(upvoted({ postId: post.$id, hasUpvoted: false }));

    } else {
      await appwriteService.createUpvote({ postId, userId });
      setHasUpvoted(true);
      setUpvoteCount((count) => count + 1);
      dispatch(upvoted({ postId: post.$id, hasUpvoted: true }));
    }
  } catch (error) {
    console.error("Upvote toggle failed:", error);
  } finally {
    setVoteInProgress(false);
  }
};
     
  const deletePost = async () => {
    const confm=confirm("Are you sure you want to delete the post")
    if(confm){
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  }
}

  // return post ? (
  //     <div className="w-full p-4">
  //       <p className='text-2xl text-red-600'>Hello World</p>
  //       <div className="w-full flex flex-col justify-between items-center mt-20">
  //       <h1 className="text-3xl font-bold text-slate-600  max-w-[700px] text-left text-wrap">{post.title}</h1>
  //       <div className="mt-8 flex w-[50px] h-[15px] justify-between items-center text-left mr-[650px]">
  //       <p className="text-sm font-light text-slate-800 text-nowrap">{post?.Author}</p>
  //       <p className="text-base font-extralight text-slate-500 ml-1.5">Follow</p>
  //       </div>
  //       <div className="mt-2 flex justify-between items-center text-left mr-[540px]">
  //       <p className="text-base font-extralight text-slate-500">5 min read .</p>
  //       <p className="text-base font-extralight text-slate-500 ml-1">{post?.Publish_Date}</p>
  //       </div>
  //       <div className="mt-4 flex justify-between items-center">
  //      <ArrowBigUp onClick={()=>handleUpvoteToggle({postId:post.$id,userId:userId})} className={`${hasUpvoted?'text-orange-600':'text-slate-700'}`}/>
  //       <p className={`${hasUpvoted?'text-orange-600':'text-slate-700'} text-xl font-semibold`}>{upvoteCount}</p>
  //     </div>

  //         <img
  //           src={appwriteService.getFilePreview(post.featuredImage)}
  //           alt={post.title}
  //           className="h-[400px] w-[600px] mt-4 rounded-xl"
  //         />
  //      {/* {isAuthor && ( */}
  //         {/* )}  */}
  //       <div className="mb-6 w-full mt-8">
  //         <div className="browser-css text-slate-500 text-left">
  //           {/* The parse comes from the html react parser and it is used to convert the inline html components
  //   of the tinyMCE editor to jsx format in order to be rendered by react. */}
  //           {parse((post.content))}
  //         </div>
          
  //       </div>
  //       </div>
  //       </div>
  // ) : null

  return post ? (
  <div className="w-full px-6 py-4">
    {/* Optional header */}
    <p className="text-2xl font-semibold text-red-600 mb-4">Hello World</p>

    <div className="max-w-3xl mx-auto flex flex-col gap-6 mt-12">
      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-700 leading-snug">{post.title}</h1>

      {/* Author + Follow */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <p className="font-medium">{post?.Author}</p>
        <span className="text-slate-400">•</span>
        <button className="text-slate-500 hover:text-blue-600 transition">Follow</button>
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <p>5 min read</p>
        <span className="text-slate-400">•</span>
        <p>{post?.Publish_Date}</p>
      </div>

      {/* Upvote Section */}
      <div className="flex items-center gap-2 mt-2">
        <ArrowBigUp
          onClick={() => handleUpvoteToggle({ postId: post.$id, userId })}
          className={`${hasUpvoted ? 'text-orange-600' : 'text-slate-700'} cursor-pointer`}
        />
        <p className={`${hasUpvoted ? 'text-orange-600' : 'text-slate-700'} text-lg font-semibold`}>
          {upvoteCount}
        </p>
      </div>

      {/* Featured Image */}
      <img
        src={appwriteService.getFilePreview(post.featuredImage)}
        alt={post.title}
        className="w-full max-w-[600px] mx-auto rounded-xl shadow-md"
      />

      {/* Content */}
      <div className="mt-8 text-slate-600 leading-relaxed browser-css">
        {parse(post.content)}
      </div>
    </div>
  </div>
) : null;
}

export default Post
