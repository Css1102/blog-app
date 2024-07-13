import React, { useState, useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import appwriteService from "../appwrite/ConfigDb";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import PostCard from "../components/PostCard";
import store from '../store/store.js'
import {useSelector} from 'react-redux'
import cricimg from '../assets/cricimg.svg'
function Home() {
  const [posts, setPosts] = useState([]);
  const logoutChk=useSelector((state)=>state.auth.status)
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if(posts.length!==0 && logoutChk){
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap justify-around align-middle">
            {posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
  else{
    return (
      <div className="w-full py-8 h-full">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full ">
            <h1 className="text-3xl font-bold mb-10 mt-1 text-amber-600 ease-in-out dration-200">CRICK GEEKS</h1>
            <img className='rounded-xl object-cover h-[60%] w-[30%] flex relative left-1/3 mb-10' src={cricimg} alt="" />
              <h3 className='text-2xl font-semibold  inline-block font-Roboto text-pink-400 hover:text-primary transition duration-200'>Welcome cricket lovers to the ultimate<br/>encyclopedia of the gentlemen's game</h3>
              <br/>
              <h3 className='text-2xl font-prec text-pink-400 inline-block hover:text-primary shadow-md transition duration-200 cursor-pointer'><Link className='hover:text-black cursor-pointer drop-shadow-md'
              to='/login'>Login Here</Link></h3>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
