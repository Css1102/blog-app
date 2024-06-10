import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
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
path:'/Login',
element:(
<Protected authentication={false}>
<Login/>
</Protected>
)
},
{
  path:'/SignUp',
  element:(
  <Protected authentication={false}>
  <SignUp/>
  </Protected>
  )
  },
  {
    path:'/AllPosts',
    element:(
    <Protected authentication={true}>
    <AllPosts/>
    </Protected>
    )
    },
    {
      path:'/AddPosts',
      element:(
      <Protected authentication={true}>
      <AddPost/>
      </Protected>
      )
      },
      {
        path:'/EditPosts/:slug',
        element:(
        <Protected authentication={true}>
        <EditPosts/>
        </Protected>
        )
        },
        {
          path:'/Posts/:slug',
          element:(
          <Protected authentication={true}>
          <Post/>
          </Protected>
          )
          },
],
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={route}/>
  </Provider>
  </React.StrictMode>,
)
