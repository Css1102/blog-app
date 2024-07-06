import React from 'react'
import {Controller} from 'react-hook-form'
import {Editor} from '@tinymce/tinymce-react'
function RTE(
{name,control,label,defaultValue=""}
) {
  return (
<div className='w-full'>
{
label && <label className='inline-block mb-1 pl-1'>{label}</label>
}
{/* The controller is used to provide the control of external components to the react hook form. 
 */}
<Controller
// Provided by the user to the controller and if not provided use default value. 
name={name || "version"}   
// It is provided by the user to the controller.
control={control}
// render takes a callback as a parameter in which feild is passed with the value onChange
render={({field:{onChange}})=>(
  // The editor is provided by the tinyMCE editor which intake the following attributes.
  // some of these can be bought from the official documentation.
<Editor
apiKey='3w5v7jlulw02fgdl5v6l2eaqozyzflenzqhiiburygb8vjf2'
initialValue={defaultValue}
init={{
initialValue:defaultValue,
branding:false,
height:500,
menubar:true,
plugins:['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
}}
onEditorChange={onChange}
/>
)}
/>
</div>
  )
}

export default RTE