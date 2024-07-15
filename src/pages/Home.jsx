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
              <h3 className='text-2xl font-semibold  inline-block font-Roboto text-rose-600 hover:text-primary transition duration-200'>Welcome cricket lovers to the ultimate<br/>encyclopedia of the gentlemen's game</h3>
              <br/>
              <h3 className='text-2xl font-prec text-rose-600 inline-block hover:text-primary shadow-md transition duration-200 cursor-pointer'><Link className='hover:text-black cursor-pointer drop-shadow-md'
              to='/login'>Login Here</Link></h3>
            </div>
            <h3 className="text-3xl font-semibold relative left-[30%] font-playwrite text-slate-900 hover:text-primary transition duration-200 mt-20">ON THIS DAY:15/07/1938</h3>
          <h4 className="mt-20 mr-10 text-xl font-medium text-slate-900 relative top-20 hover:text-primary transition duration-200">Fagg's unique double-hundreds
</h4>
          <p className='text-sm font-[400] text-left w-full flex flex-row-reverse relative top-24 ml-0 font-Roboto text-rose-600 '>Kent's 23-year-old Arthur Fagg became the first man in history to score two double-centuries in a first-class match when he cracked 202 not out in two hours and 50 minutes against Essex in Colchester. He had already made a five-hour 244 on the first day, including a century before lunch. Less than 18 months earlier Fagg had returned early from the tour of Australia on a stretcher after contracting rheumatic fever, and subsequently missed the entire 1937 summer. Fagg remains one of only two players to achieve this rare feat - in February 2019, Sri Lanka's Nondescripts Cricket Club captain Angelo Perera became the second, making 201 and 231 in the same game against the Sinhalese Sports Club.


</p>
     <img className='h-[50%] w-[50%] object-cover mt-32 relative left-64' src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_70/lsci/db/PICTURES/CMS/217700/217729.jpg" alt="" />        
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
