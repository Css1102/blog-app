import React, { useState, useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import appwriteService from "../appwrite/ConfigDb";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import PostCard from "../components/PostCard";
import About from "../components/About.jsx";
import Services from '../components/Services'
import store from '../store/store.js'
import {useSelector} from 'react-redux'
import cricimg from '../assets/cricimg.svg'
import axios from 'axios'
import iccimg from '../assets/png-transparent-women-s-cricket-world-cup-icc-test-championship-international-cricket-council-united-states-national-cricket-team-world-cup-blue-sport-logo-thumbnail.png'
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

const[ipo,setIpo]=useState([]);
async function getIPOdata(){
try{
const response=await axios.get('https://upcoming-ipo-calendar.p.rapidapi.com/ipo-calendar',{
headers:{
'x-rapidapi-key':'7857aa7f2dmshe9038cb01367b9cp186d5bjsn9e4f374078ec',
'x-rapidapi-host':'upcoming-ipo-calendar.p.rapidapi.com',
}
});
console.log(response)
if(response){
setIpo(response.data.ipos)
}
}
catch(e){
console.log("api not found"+e)
}
}
  useEffect(()=>{
    getIPOdata()
  },[])

//   if(posts.length!==0 && logoutChk){
//     return (
//       <div className="w-full">
//         <Container>
//         <h2 className="md:text-3xl mb-20 text-base font-normal md:bottom-10 md:font-semibold relative md:left-0 font-playwrite text-slate-900 hover:text-primary transition duration-200 mt-20">TRIVIA</h2>
//         <div className="flex flex-col py-0 mt-0 justify-between">
//         <div className="mt-0">
//         <h3 className="md:text-3xl text-base font-normal md:font-semibold relative md:bottom-16 md:right-[440px] xl:right-[470px] font-playwrite text-slate-200 mb-6 hover:text-primary transition duration-200">Did you know?</h3>
//         <p className="text-sm md:font-[400] md:mt-0 text-left md:bottom-16 w-full flex flex-row-reverse relative ml-0 font-Roboto text-rose-600 ">
//         The lowest score ever defended in an ODI World Cup final, as of 2023, is 183 runs. This occurred during the 1983 Cricket World Cup final when India faced the West Indies. India batted first and was bowled out for 183 runs.West Indies motored to 50 for 1, with Viv Richards scything seven fours in a 28-ball 33, but the match turned when he hoicked Madan Lal high in the air and was superbly caught by Kapil Dev. The drama of 57 for 3 soon turned into a crisis at 76 for 6, as India's medium-pacers wobbled West Indies to death, and the cricket world slowly realised that a monstrous shock was on the cards. The Man of the Match was Mohinder Amarnath, for his 26 and 3 for 12. The highest score in the whole match was Kris Srikkanth's 38.

// Despite the low total, India managed to bowl out the West Indies for 140 runs, winning the match by 43 runs. This historic victory marked India's first World Cup win and is considered one of the greatest upsets in cricket history.It also changed the trajectory of cricket in India and the popularity of cricket in India skyrocketed after that. India's ability to defend such a low total in the final remains a remarkable achievement in the annals of the sport.
//         </p>
//         </div>
//         <img className='h-[50%] w-[50%] object-cover relative left-16 md:left-64' src="https://m.economictimes.com/thumb/msid-101246250,width-1600,height-900,resizemode-4,imgsize-67744/1983-world-cup-ians.jpg" alt="" />
//         </div>
//          <button className='md:text-xl text-lg rounded-full px-2 py-1 mt-4 ml-4 -z-50 font-prec text-slate-200 w-[120px] h-[40px] bg-[rgb(78,51,235)] inline-block mr-6 hover:opacity-80 shadow-md transition duration-200 cursor-pointer'><Link className=' cursor-pointer drop-shadow-md'
//          to='/allposts'>Click here</Link></button>
//        <h4 className=" text-sm font-normal left-[0px]  xl:mr-60 xl:ml-10 xl:left-24  md:text-xl md:font-medium text-slate-200 relative hover:text-primary transition duration-200">If you are also a cric nerd Like me</h4>
//             {/* {posts.map((post) => (
//               <div className="p-2 w-1/4" key={post.$id}>
//                 <PostCard {...post} />
//               </div>
//             ))} */}
//         </Container>
//       </div>
//     );
//   }
//   else{
    return (
      <div className="w-full py-8 h-full bg-lime-200">
        {/* <Container>
        </Container> */}
        <div className="font-sora text-4xl font-bold text-green-800 mt-32">Compounding your Cash</div>
      <div className="text-2xl font-sora font-light text-slate text-white opacity-100 mt-6">By Strategies and market insights which gaurantee upto 50% Return on Investment</div>
      <img src="https://www.finology.in/image/hero.svg" alt="" className="mt-20 ml-80" />
      <h3 className="text-green-700 font-semibold mt-24 mb-16 text-center text-3xl">What We Offer</h3>
     <Services/>
     <About/>
      </div>
    );
  }


export default Home;
