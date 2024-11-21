import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Protected from './components/Protected.jsx'
import SignUp from './pages/SignUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPosts from './pages/EditPosts.jsx'
import Post from './pages/Post.jsx'
const route=createBrowserRouter([
{
path:'/',
element:<App/>,
children:[
  {
  path:'/',
  element:<Home/>
  },
{
path:'/login',
element:(
<Protected authentication={false}>
<Login/>
</Protected>
)
},
{
  path:'/signup',
  element:(
  <Protected authentication={false}>
  <SignUp/>
  </Protected>
  )
  },
  {
    path:'/allposts',
    element:(
    // <Protected authentication>
    <AllPosts/>
    // </Protected>
    )
    },
    {
      path:'/addposts',
      element:(
      <Protected authentication>
      <AddPost/>
      </Protected>
      )
      },
      {
        path:'/editposts/:slug',
        element:(
        <Protected authentication>
        {" "}
        <EditPosts/>
        </Protected>
        )
        },
        {
          path:'/posts/:slug',
          element:(
          <Protected authentication>
          <Post/>
          </Protected>
          )
       },
],
}
// createRoutesFromElements(
// <Route path='/' element={<App/>}>
// <Route path='/' element={<Home/>}/>
// <Route path='/login' element={(<Protected authentication={false>}<Login/></Protected>)}/>
// </Route>
// 
]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={route}/>
  </Provider>
  </React.StrictMode>,
)
