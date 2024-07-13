import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Container from "../components/container/Container";
import appwriteService from "../appwrite/ConfigDb";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
function Post() {
  const [post, setPost] = useState(null);
  const {slug} = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
    console.log(slug)
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

  const deletePost = async () => {
    const status = await appwriteService.deletePost(post.$id);
    if (status) {
      await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-[40%] w-[30%]"
          />
          {/* {isAuthor && (
            <div className="absolute-right-6 top-6 ml-3">
              <Link to={`/editposts/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3 ml-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-green-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )} */}
        </div>
        <div className="mb-6 w-full">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {/* The parse comes from the html react parser and it is used to convert the inline html components
    of the tinyMCE editor to jsx format in order to be rendered by react. */}
            {parse(JSON.stringify(post.content))}
          </div>
          {isAuthor && (
            <div className="absolute-right-6 top-6 ml-3">
            <Link to={`/editposts/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3 ml-3">
                  Edit
              </Button>
               </Link>
              <Button bgColor="bg-green-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
