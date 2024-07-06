import React from 'react'
// When we combine different components at distinct locations it is known as component building.
// The default component is also known as dumb component as it does not take any argument inside it.
// In order to pass an argument inside it we write a property while calling the component.
// In react the property is labelled as"props". props is recieved in the component as an object. To
// ensure that atleast some text is printed we can also give a default value to the prop inside the 
// component declaration. component is provided in line 8 of the code.
const Card = ({username='hitesh', alsoPass}) => {
  return (
    <div>
    <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
  <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://yt3.googleusercontent.com/MHG_WZ4G1vgEAa7zx0_zizqYv4uprAlMsmZA9UHuqm7zIzwefuUy-UiJbN3W8QHm0W-xv7xXZg=s900-c-k-c0x00ffffff-no-rj" alt="" width="384" height="512"/>
  <div className="pt-6 md:p-8 text-center space-y-4">
    <blockquote>
      <p className="text-lg font-medium">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, optio consectetur, quam odit quaerat facilis aspernatur illum nemo cupiditate, tempore ipsam! Asperiores delectus nam sed aliquam alias veritatis quasi ducimus!
      </p>
    </blockquote>
    <figcaption className="font-medium">
      <div className="text-sky-500 dark:text-sky-400">
      {username}
      </div>
      <div className="text-slate-700 dark:text-slate-500">
      {alsoPass.name}
      </div>
    </figcaption>
  </div>
</figure>

    {/* <img src="https://media.istockphoto.com/id/1354697451/vector/modern-vip-bank-card-with-world-map-vector-mockup.jpg?s=612x612&w=0&k=20&c=GyQ0bUNS02CBLTgo_VXWHzeciuCHwJk6l2pv0se6_58=" alt="not available" />
    <h1 className="text-2xl bg-green-500 p-3 rounded-md"></h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, odio! Porro libero reprehenderit ut mollitia labore, ipsa blanditiis sapiente cupiditate.</p> */}
    </div>
  )
}

export default Card