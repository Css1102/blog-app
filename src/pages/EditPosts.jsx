import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from '../appwrite/ConfigDb.js'
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import { useSelector,useDispatch} from "react-redux";
import { jwtDecode } from "jwt-decode";

function EditPosts() {
  const jwtFromState=useSelector((state)=>state.auth.jwt)
  const [post, setPost] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  console.log(slug);
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
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 w-full min-h-[80vh] text-center flex items-center justify-center">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPosts;
