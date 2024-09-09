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
            <h3 className="text-3xl font-semibold relative left-[30%] font-playwrite text-slate-900 hover:text-primary transition duration-200 mt-20">ON THIS DAY:09/09/1853</h3>
          <h4 className="mt-20 ml-10  text-xl font-medium text-slate-900 relative top-20  hover:text-primary transition duration-200">Dawn of the Demon


</h4>
          <p className='text-sm font-[400] text-left w-full flex flex-row-reverse relative top-24 ml-0 font-Roboto text-rose-600 '>They were right to call Fred Spofforth, who was born this day, the Demon: he could do magic. Never more so than in the famous Oval Test of 1882, which gave rise to the legend of the Ashes. England were set only 85 to win, but the fiendish one had already taken 7 for 46 in the first innings. Now he bowled maiden after excruciating maiden, finishing with 7 for 44 and winning the match for Australia by seven runs. If that was his greatest day, others came close. At the MCG in 1878-79, employing hostility and change of pace, he took 13 wickets to beat England by ten wickets. In 1878 he took 11 wickets for 20 to beat MCC in a day. He and George "Joey" Palmer exchanged the world record for most Test wickets; as usual, the Demon came out on top, finishing with 94 at 18.91 in only 18 Tests. Even his natural successor Dennis Lillee, who matched him for guile and sinister facial hair, was never so cunning an exponent of the dark arts.








</p>
     <img className='h-[50%] w-[50%] object-cover mt-32 relative left-64' src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_70/lsci/db/PICTURES/CMS/221700/221791.jpg" alt="" />        
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
