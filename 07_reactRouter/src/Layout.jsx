import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Header/Footer/Footer'
function Layout() {
  return (
  <>
  {/* In the layout the header and the footer remain same for each page only the content inside the component
  changes. So in order to optimizze this effect we wrap Outlet in between header and footer which iterates
  through each component as they are invoked */}
  <Header/>
  <Outlet/>
  <Footer/>
  </>
  )
}

export default Layout