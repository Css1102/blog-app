import React from 'react'
import blogimg from '../assets/blogimg.svg'
function Logo({width='20%',height='10%'}) {
  return (
    <img src={blogimg} height={height} style={{width}} alt="Logo img" />
  )
}

export default Logo