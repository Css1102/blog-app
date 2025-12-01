import React, { useCallback,useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import { jwtDecode } from "jwt-decode";
import  appwriteService from "../../appwrite/ConfigDb.js";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { classifyTag } from "../../Tag_generator/Tags";
// import addToMap from '../../store/authSlice'
export default function PostForm({ post }) {
  // We can manage the state of multiple parameters of a form using the useForm hook coming from
  // react-hook-form. it gives the following methods.
  const { register, handleSubmit, watch, setValue, control, getValues,formState:{errors} } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const Navigate = useNavigate();
  const dispatch=useDispatch()
  const isPost=post?true:false;

  const userData = useSelector((state) => state.auth.userData);
  const jwtFromState=useSelector((state)=>state.auth.jwt)
  const userId=userData.$id===undefined ? userData.userData.$id:userData.$id;
  const[canPost,setCanPost]=useState(false)
  const[canPostStatus,setCanPostStatus]=useState(false)
  const handleHover=()=>{
  setHovered(true)
  }

  const handleHover_2=()=>{
  setHovered(false)
  }

useEffect(() => {
  if (jwtFromState) {
    const { exp } = jwtDecode(jwtFromState);
    if (Date.now() >= exp * 1000) {
      appwriteService.clearJWT();
      dispatch(logout());
      toast.error("Session expired, please log in again.");
      navigate("/login");
    } else {
      appwriteService.setJWT(jwtFromState);
    }
  }
}, [jwtFromState]);  const submit = async (data) => {
    console.log(data);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }
      const attachedTagUpdated=await classifyTag(post.content)
      const dbPost = await appwriteService.updatePosts(post.$id, {
        ...data,
        attachedTag:attachedTagUpdated,
        featuredImage: file ? file.$id : undefined
      });
      if (dbPost) {
        Navigate(`/posts/${dbPost.$id}`);
      }
      // const reduceObj={id:post.$id,likes:Math.floor(Math.random()*100)+50}
      // dispatch(addToMap(reduceObj))

    } else {
      const file = await appwriteService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(userData)
        const attachedTag=await classifyTag(data?.content)
        const dbPost = await appwriteService.createPost({
          ...data,
          attachedTag,
          userId: userId
        });
        // const reduceObj={id:post.$id,likes:Math.floor(Math.random()*100)+50}
        // dispatch(addToMap(reduceObj))
        if(dbPost){
          Navigate(`/posts/${dbPost.$id}`);
        }
      }

    }
  };

  // the slugTransform method modifies the title value. It remove the spaces from it and converts it to
  // lower case. And it uses regex function to replace the spaces with _. It is wrapped in useCallback
  // to optimize the rendering.
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    else{
    return ""
    }
  }, []);

  useEffect(()=>{
  const checkCanPost=async()=>{
  const createPost=await appwriteService.canUserCreatePost({userId});
  setCanPost(createPost)
  setCanPostStatus(true)
  }

  checkCanPost()
  },[post])
  // The watch method is used to oversee a form input and also return it's value. We have used it als=ong
  // with the useEffect hook and passed it into the dependency array.
  React.useEffect(() => {
    const suscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => suscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form className="flex flex-col md:flex-row min-h-screen items-center md:items-start gap-24 justify-center rounded-xl p-2 sm:p-10 text-textColor py-6 relative bottom-10" onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 px-2 text-start">
        <Input
          label="Title :"
          placeholder="title"
          className="mb-2 mt-0.5"
          // In order to provide the input feild we destructure the register and pass the feild along with
          // the required object. This retrieves the given feild from the useForm hook and passes it to
          // the input.
          {...register("title", { required: true })}
        />
        {errors.title && <span className="text-red-500 text-base font-medium ml-2 mt-0">tittle is required</span>}
          <Input
          label="Author:"
          
          placeholder="name"
          className="mb-2 mt-0.5"
          {...register("Author", { required: true })}
        />
                {errors.Author && <span className="text-red-500 text-base font-medium ml-2 mt-0">Author is required</span>}

          <Input
          label="Publish Date:"
          placeholder="Date(DD-MM-YYYY)"
          className="mb-2 mt-0.5"
          {...register("Publish_Date", { required: true,minLength:10 })}
        />
          {errors.Publish_Date && <span className="text-red-500 text-base font-medium ml-2 mt-0">Date is required</span>}
        <Input
          label="Slug :"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: !true })}
          onInput={(e) =>{
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }}
        />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 text-start">
        <Input
          label="Featured Image"
          type="file"
          className="mb-2"
          accept="image/png,image/jpeg,image/jpg"
          {...register("image", { required: !post })}
        />
        {errors.image && <span className="text-red-500 text-base font-medium ml-2 mt-0">image is required</span>}

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          label="Status"
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />
        <div className="flex flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer rounded-2xl bg-[rgb(78,51,235)]"
          bgColor={post ? "bg-green-500" : "bg-gray"}
          disabled={!canPost}
          isUpdateMode={isPost}
        >
          {post ? "Update" : "Submit"}
        </Button>
  {!canPost  && !post &&  canPostStatus && (
  <div className="mt-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-300 rounded-xl px-3 py-2 w-full">
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z" />
    </svg>
    <span>
      You need at least one post with <strong>2+ upvotes</strong> to create another post.
    </span>
  </div>
)}   </div>
      </div>
    </form>
  );
}
