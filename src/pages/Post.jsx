import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Container from "../components/container/Container";
import appwriteService from '../appwrite/ConfigDb.js'
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import trash_icon from '../assets/trash-2.png'
import trending_icon from '../assets/trending-up.png'
import { useSelector,useDispatch } from "react-redux";
import { ArrowBigUp } from "lucide-react";
import { Databases,Query,Client} from "appwrite";
import { upvoted } from "../store/authSlice";
import { jwtDecode } from "jwt-decode";
import conf from '../conf/conf'
function Post() {
 const[post,setPost]=useState(null)
  const {slug} = useParams();
  const navigate = useNavigate();
  const[voteInProgress,setVoteInProgress]=useState(false)
  const jwtFromState=useSelector((state)=>state.auth.jwt)
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
}, [jwtFromState]);  useEffect(() => {
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
     



return post ? (
  <div className="w-full px-6 py-10 bg-lime-200 min-h-screen">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
      
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-slate-800 leading-tight text-center mb-6">
        {post.title}
      </h1>

      {/* Author + Meta */}
      <div className="flex flex-col items-center text-sm text-slate-600 mb-6">
        <div className="flex items-center gap-2">
          <p className="font-medium">{post?.Author}</p>
          <span className="text-slate-400">•</span>
          <button className="text-slate-500 hover:text-indigo-600 transition font-semibold">
            Follow
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-slate-500">
          <p>5 min read</p>
          <span className="text-slate-400">•</span>
          <p>{post?.Publish_Date}</p>
        </div>
      </div>

      {/* Upvote Section */}
      <div className="flex items-center gap-3 mb-6">
        <ArrowBigUp
          onClick={() => handleUpvoteToggle({ postId: post.$id, userId })}
          className={`w-8 h-8 ${
            hasUpvoted
              ? "text-orange-600 hover:text-orange-700"
              : "text-slate-500 hover:text-slate-700"
          } cursor-pointer transition-transform duration-200 hover:scale-110`}
        />
        <p
          className={`${
            hasUpvoted ? "text-orange-600" : "text-slate-700"
          } text-lg font-semibold`}
        >
          {upvoteCount}
        </p>
      </div>

      {/* Featured Image */}
      <img
        src={appwriteService.getFilePreview(post.featuredImage)}
        alt={post.title}
        className="w-full max-w-[700px] rounded-xl shadow-md mb-8"
      />

      {/* Content */}
      <div className="text-slate-700 leading-relaxed prose prose-slate max-w-none text-justify">
        {parse(post.content)}
      </div>

    </div>
  </div>
) : null;}

export default Post
