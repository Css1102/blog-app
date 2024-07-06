import React,{useId} from 'react'
// In order to pass props from child to parent component we use forwardRef in which we declare the function and
// pass all the props. 
const Input=React.forwardRef(function Input({
label,
type= 'text',
className= "",
...props
},ref){
const Id=useId()
return(
<div className="w-full">
{label && (<label htmlFor={Id} className='inline-block mb-1 pl-1'>{label}</label>)}
<input className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border
 border-gray-200 w-full ${className}`}
type={type} 
id={Id}
{...props}
ref={ref}
/>
</div>
)
})
export default Input