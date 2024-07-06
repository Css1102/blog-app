import React,{useState,useEffect} from 'react'
import {useNavigate,useParams } from 'react-router-dom'
import appwriteService from '../appwrite/ConfigDb'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
import PostCard from '../components/PostCard'

function Home() {
  const[posts,setPosts]=useState([])
  useEffect(()=>{
  appwriteService.getPosts([]).then((posts)=>{
  if(posts){
  setPosts(posts.documents)
  }
  })
  },[])
  
  if(posts.length===0){
  return(
    <div className="w-full py-8">
    <Container>
  <div className="flex flex-wrap">
  <div className="p-2 w-full">
  <h1>Redirect to the login page.</h1>
  </div>
  </div>
    </Container>
     </div>
  )
  }
  else{
  return (
    <div className="w-full py-8">
    <Container>
  <div className="flex flex-wrap">
  {posts.map((post)=>(
  <div className="p-2 w-1/4" key={post.$id}>
  <PostCard {...post}/>
  </div>
  ))}
  </div>
    </Container>
     </div>
  
  )
  }
}

export default Home