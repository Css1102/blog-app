import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";
import { toast } from 'react-hot-toast';
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
   
    setJWT(jwt) {
    if (jwt) {
      console.log("verifying jwt")
      this.client.setJWT(jwt);
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);
    }
  }


  async getPost(slug) {
    try {
      console.log(slug);
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        slug
      );
    } catch (error) {
      console.log("Appwrite error detected at :: getPost", error);
      return false;
    }
  }

async getPosts(userId,queries = [Query.equal("status", "active")]) {
  try {
    console.log("inside getposts try block")
    console.log(userId)
    // const finalQueries = [
    //   ...queries,
    //   Query.equal("userId", userId),
    // ];

    const posts= await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
     queries
    );
    return posts

  } catch (error) {
    console.log("Appwrite error detected at :: getPosts", error);
    return false;
  }
}
  async createPost({ title,slug, content, featuredImage,attachedTag, status, userId, Author,Publish_Date,Upvotes }) {
    try {
      console.log(userId)
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        ID.unique(),
        { title, content, featuredImage, status, userId,Author,Publish_Date,attachedTag }
      );
    } catch (error) {
      console.log("Appwrite  detected at :: getPosts", error);
      return false;
    }
  }
  async updatePosts(slug, { title, featuredImage, content,attachedTag,status,Author,Publish_Date,Upvotes }) {
     try {
    return await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      slug,
      {
        title,
        featuredImage,
        content,
        status,
        Author,
        Publish_Date,
        tag:attachedTag
      }
    );
  }catch (error) {
      console.log("Appwrite error detected at :: updatePosts", error);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error detected at :: updatePosts", error);
      return false;
    }
  }
  // storage service
  async uploadFile(File) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        File
      );
    } catch (error) {
      console.log("Appwrite error detected at :: uploadFile", error);
      return false;
    }
  }
  async deleteFile(FileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, FileId);
      return true;
    } catch (error) {
      console.log("Appwrite error detected at :: deleteFile", error);
      return false;
    }
  }
  getFilePreview(FileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, FileId);
  }

  async createUpvote({postId,userId}){
    try {

    const existing = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_three_Id,
      [
        Query.equal("postId", postId),
        Query.equal("userId", userId),
      ]
    );

    if (existing.total > 0) {
      throw new Error("You've already upvoted this post.");
    }

    await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_three_Id,
      ID.unique(),
      { postId, userId }
    );
    // Increment upvote count on post
    const post = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      postId
    )
    await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      postId,
      { Upvotes:post.Upvotes + 1 }
    );
    console.log(post.Upvotes)
    toast.success("Upvoted successfully!");
  } catch (error) {
    toast.error(error.message);
  }
  }

  async canUserCreatePost({userId}){
  try{
  const posts=await this.databases.listDocuments(
 conf.appwriteDatabaseId,
 conf.appwriteCollection_two_Id,
[Query.equal("userId", userId)]
  )
  console.log(posts)
  if(posts.total===0){
  return true
  }
  const filteredPosts=posts.documents.some((post)=>post.Upvotes>=2)
  if(filteredPosts){
  return true
  }
  else{
  return false
  }
  }

catch(error){
console.log("error checking post eligibility",error)
return false
}
}
async downVote({postId,userId}){
    try {
    const upvoteRecord = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_three_Id,
      [
        Query.equal("postId", postId),
        Query.equal("userId", userId),
      ]
    );

    if (upvoteRecord.total === 0) {
      throw new Error("You haven't upvoted this post.");
    }

    const post = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id, 
      postId
    );

    if ((post.Upvotes || 0) <= 0) {
      throw new Error("Cannot downvote a post with zero Upvotes.");
    }

    await this.databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      postId,
      { Upvotes: post.Upvotes - 1 }
    );

    await this.databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_three_Id,
      upvoteRecord.documents[0].$id
    );

    toast.success("Downvoted successfully.");
  } catch (error) {
    console.error("Error in downvoting post:", error);
    toast.error(error.message || "Failed to downvote.");
  }


}
  async upvoteSlug({userId, postId}){
  const posts=await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollection_three_Id,
    [
        Query.equal("postId", postId),
        Query.equal("userId", userId),
      ])
    return posts.total>0
  }

}
const appwriteService=new Service()
export default appwriteService