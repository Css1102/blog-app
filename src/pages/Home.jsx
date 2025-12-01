import React, { useState, useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import appwriteService from '../appwrite/ConfigDb.js'
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import PostCard from "../components/PostCard";
import About from "../components/About.jsx";
import { jwtDecode } from "jwt-decode";
import Services from '../components/Services'
import store from '../store/store.js'
import {useSelector} from 'react-redux'
import cricimg from '../assets/cricimg.svg'
import axios from 'axios'
import iccimg from '../assets/png-transparent-women-s-cricket-world-cup-icc-test-championship-international-cricket-council-united-states-national-cricket-team-world-cup-blue-sport-logo-thumbnail.png'
function Home() {
  const [posts, setPosts] = useState([]);
  const logoutChk=useSelector((state)=>state.auth.status)
  const jwtFromState=useSelector((state)=>state.auth.jwt)

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

return (
<div className="w-full min-h-screen bg-lime-100 px-4 sm:px-6 md:px-12 pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16">
  {/* Hero Section */}
  <div className="text-center px-2">
    <h1 className="font-sora text-2xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-3 sm:mb-4">
      Compounding your Cash
    </h1>
    <p className="text-sm sm:text-lg md:text-2xl font-sora font-light text-green-900 max-w-xl sm:max-w-3xl mx-auto leading-relaxed">
      By strategies and market insights which guarantee up to 50% Return on Investment
    </p>
  </div>

  {/* Hero Image */}
  <div className="flex justify-center mt-8 sm:mt-12 px-2">
    <img
      src="https://www.finology.in/image/hero.svg"
      alt="Hero"
      className="w-full max-w-md sm:max-w-2xl md:max-w-3xl object-contain rounded-lg shadow-md"
    />
  </div>

  {/* Section Title */}
  <h3 className="text-green-700 font-semibold mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-8 md:mb-10 text-center text-lg sm:text-2xl md:text-3xl">
    What We Offer
  </h3>

  {/* Services + About */}
  <div className="max-w-6xl mx-auto px-2 sm:px-4">
    <Services />
    <About />
  </div>
</div>
);

}


export default Home;
