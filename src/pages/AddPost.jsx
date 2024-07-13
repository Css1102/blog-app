import React,{useState,useEffect} from 'react'
import {useNavigate,useParams } from 'react-router-dom'
import appwriteService from '../appwrite/ConfigDb'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'

function AddPost() {
  return (
  <div className="py-8 flex items-center justify-center overflow-visible">
  <Container>
  <PostForm/>
  </Container>
  </div>
  )
}

export default AddPost