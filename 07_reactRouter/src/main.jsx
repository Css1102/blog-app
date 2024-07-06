import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import User from './components/User/User.jsx'
import Github,{GithubInfoLoad} from './components/Github/Github.jsx'

const Router=createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
   <Route path='' element={<Home/>}/>
   <Route path='/about' element={<About/>}/>
   <Route path="user/" element={<User/>}>
   <Route path=":userid" element={<User/>}/>
  </Route>
  <Route path="github" 
  loader={GithubInfoLoad}
  element={<Github/>}/>
  <Route path="*" element={<div>Element Not found</div>}/>
  </Route>
)

)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={Router} />
  // </React.StrictMode>,
)
