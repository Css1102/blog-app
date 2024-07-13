import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/ConfigDb.js";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/posts/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 h-[300px]">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl h-[80%] w-[80%] ml-5"
          />
        </div>
        <h2 className="text-xl font-bold py-2">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
