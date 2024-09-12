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
      <div className="w-full">
        <Container>
        <h2 className="md:text-3xl mb-20 text-base font-normal md:bottom-10 md:font-semibold relative md:left-0 font-playwrite text-slate-900 hover:text-primary transition duration-200 mt-20">TRIVIA</h2>
        <div className="flex flex-col py-0 mt-0 justify-between">
        <div className="mt-0">
        <h3 className="md:text-3xl text-base font-normal md:font-semibold relative md:bottom-16 md:right-[440px] xl:right-[470px] font-playwrite text-slate-900 mb-6 hover:text-primary transition duration-200">Did you know?</h3>
        <p className="text-sm md:font-[400] md:mt-0 text-left md:bottom-16 w-full flex flex-row-reverse relative ml-0 font-Roboto text-rose-600 ">
        The lowest score ever defended in an ODI World Cup final, as of 2023, is 183 runs. This occurred during the 1983 Cricket World Cup final when India faced the West Indies. India batted first and was bowled out for 183 runs.West Indies motored to 50 for 1, with Viv Richards scything seven fours in a 28-ball 33, but the match turned when he hoicked Madan Lal high in the air and was superbly caught by Kapil Dev. The drama of 57 for 3 soon turned into a crisis at 76 for 6, as India's medium-pacers wobbled West Indies to death, and the cricket world slowly realised that a monstrous shock was on the cards. The Man of the Match was Mohinder Amarnath, for his 26 and 3 for 12. The highest score in the whole match was Kris Srikkanth's 38.

Despite the low total, India managed to bowl out the West Indies for 140 runs, winning the match by 43 runs. This historic victory marked India's first World Cup win and is considered one of the greatest upsets in cricket history.It also changed the trajectory of cricket in India and the popularity of cricket in India skyrocketed after that. India's ability to defend such a low total in the final remains a remarkable achievement in the annals of the sport.
        </p>
        </div>
        <img className='h-[50%] w-[50%] object-cover relative left-16 md:left-64' src="https://m.economictimes.com/thumb/msid-101246250,width-1600,height-900,resizemode-4,imgsize-67744/1983-world-cup-ians.jpg" alt="" />
        </div>
       <Link to='/allposts'><h4 className=" text-sm font-normal left-[0px] mt-8  xl:mr-60 xl:ml-10 xl:left-24  md:text-xl md:font-medium text-rose-700 relative hover:text-slate-600 transition duration-200 shadow-md cursor-pointer">Click here</h4></Link>
       <h4 className=" text-sm font-normal left-[0px]  xl:mr-60 xl:ml-10 xl:left-24  md:text-xl md:font-medium text-slate-900 relative hover:text-primary transition duration-200">If you are also a cric nerd Like me</h4>
            {/* {posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))} */}
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
            <img className='rounded-xl md:object-cover h-[60%] w-[50%] mb-2 md:h-[60%] md:w-[30%] flex relative left-[60px] md:left-1/3 md:mb-10' src={cricimg} alt="" />
              <h3 className='md:text-2xl text-sm font-normal mb-0 md:font-semibold inline-block font-Roboto text-rose-600 hover:text-primary transition duration-200'>Welcome cricket lovers to the ultimate<br/>encyclopedia of the gentlemen's game</h3>
              <br/>
              <h3 className='md:text-2xl text-base font-prec text-rose-600 inline-block hover:text-primary shadow-md transition duration-200 cursor-pointer'><Link className='hover:text-black cursor-pointer drop-shadow-md'
              to='/login'>Login Here</Link></h3>
            </div>
            <h3 className="md:text-3xl text-base font-normal md:font-semibold relative md:left-[30%] font-playwrite text-slate-900 hover:text-primary transition duration-200 mt-20">ON THIS DAY:11/09/2023</h3>
          <h4 className="mt-5 text-sm font-normal md:left-32 left-[0px] md:top-20 md:ml-10 xl:top-20 xl:mr-80 xl:ml-10 xl:left-44  md:text-xl md:font-medium text-slate-900 relative hover:text-primary transition duration-200">Virat Kohli, KL Rahul and Kuldeep Yadav craft India's biggest win vs Pakistan



</h4>
          <p className='text-sm md:font-[400] text-left w-full flex flex-row-reverse top-4 relative md:top-24 ml-0 font-Roboto text-rose-600 '>KL Rahul wasn't supposed to start against Pakistan. After Shreyas Iyer suffered back spasms during the warm-ups, he replaced him on Sunday and on Monday, the reserve day, he announced his return with a sensational hundred. At the other end, Virat Kohli did his thing, bringing up a century of his own, as India piled up 356 for 2.
Jasprit Bumrah, bowling in ODIs for the first time after his injury break then discomfited Pakistan's top order with vicious swing and seam movement. He was unplayable at various points while Mohammed Siraj also ramped up the pressure on Pakistan with his accuracy. After Bumrah had Imam-ul-Haq caught in the slips, Hardik Pandya joined the party by storming through Babar Azam's defences. A rain delay then gave Pakistan respite, but upon resumption Kuldeep Yadav compounded their woes.
 The left-arm wristspinner finished with 5 for 25 in eight overs, with neither Haris Rauf or Naseem Shah walking out to bat for Pakistan. The margin of victory - 228 runs - was the biggest for India against Pakistan in ODI cricket.








</p>
     <img className='h-[50%] w-[50%] object-cover relative left-16 mt-12 md:mt-36  md:left-64' src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_70/lsci/db/PICTURES/CMS/367000/367058.jpg" alt="" />        
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
