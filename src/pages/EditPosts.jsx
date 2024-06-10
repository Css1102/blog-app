import React,{useState,useEffect} from 'react'
import {useNavigate,useParams } from 'react-router-dom'
import appwriteService from '../appwrite/ConfigDb'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'
function EditPosts() {
const[post,usePost]=useState(null)
const {slug}=useParams()
const navigate=useNavigate()

useEffect(()=>{
if(slug){
appwriteService.getPost(slug).then((post)=>{
if(post){
setPost(post)
}
else{
navigate('/')
}
})
}
},[slug,navigate])

return (
<div className="py-6">
<Container>
<PostForm post={post} />
</Container>
</div>
)
}

export default EditPosts