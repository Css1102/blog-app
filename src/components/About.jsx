import React from 'react'
import linkedin from '../assets/skill-icons--linkedin.png'
import insta from '../assets/skill-icons--instagram.png'
import twitter from '../assets/prime--twitter.png'
import telegram from '../assets/logos--telegram.png'
import me from '../assets/ChiranjeevSinghSethi_Photo-min.jpg' 
import {Link} from 'react-router-dom'
const About = () => {
  return (
    <div className="w-full mt-16">
    <h2 className="text-green-700 text-3xl font-bold">About Us</h2> 
    <div className="w-[80%] mt-10 ml-32 flex justify-between items-center">
    <img src={me} alt="dont have it currently" className="h-[150px] w-[150px] rounded-full ml-10" />
    <div className="ml-6 w-[50%] h-[100%]">
    <p className="text-gray-400 font-semibold text-base text-wrap text-left ">Hi everyone, I am Chiranjeev Singh Sethi, A retail investor like most of the people and
    interested in the world of finance. I decided to combine my skills in web app development along with equity market knowledge to develop this as a passion project.
    This endavour was started with the motive to provide guidance and insights related to
    investements, IPOs, Equity and  personal finance tips to help you to multiply your money. Along with that this serves as a
    platform where people can share their knowledge with others and contribute towards making  a financially literate world.</p>
    </div>
    </div>
    <div className="mt-6 relative left-[620px] h-[20px] w-[300px] flex justify-between items-center">
    <p className="text-base font-semibold text-gray-400 relative font-playwrite text-nowrap">Connect with me :</p>
    <div className="ml-2 flex justify-between items-center gap-4"></div>
    <Link to='http://www.linkedin.com/in/sethisc'> <img src={linkedin} alt="" className='h-[30px] w-[35px]' /></Link>
    <img src={insta} alt="" className='h-[30px] w-[30px]' />
    <img src={twitter} alt="" className='h-[30px] w-[30px]' />
    <img src={telegram} alt="" className='h-[30px] w-[30px]' />
    </div>
    </div>
  )
}

export default About