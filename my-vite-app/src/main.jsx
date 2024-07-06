import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const ReactEle={
  type: 'a',
  props:{
 href: 'https://www.geeksforgeeks.org/problems/transform-to-sum-tree/1',
 target:'_blank'
  },
  children:'Fuck me to visit gfg'
 };


//  The methodology to add an element in react is below:
const aReactEle=  React.createElement(
  // first is always the element followed by an object and at last we have it's children. It is written in the syntax given below.
  'a',
  {
  href: 'https://www.geeksforgeeks.org/problems/transform-to-sum-tree/1',
 target:'_blank'
 },
 'Fuck me to visit gfg'
)

// React sees all the JSX code inside the function as a single object. 
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
<aReactEle/>
</>
);

