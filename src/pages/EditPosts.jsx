import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/ConfigDb";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";

function EditPosts() {
  const [post, setPost] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();
  console.log(slug);
  useEffect(() => {
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
