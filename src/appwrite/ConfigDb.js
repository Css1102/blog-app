import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
   
    //   const replacementChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

    //   const pattern = /[$#!@^&*{}]/g;
  
    //   let modSlug=slug.replace(pattern, function() {
    //     return replacementChars.charAt(Math.floor(Math.random() * replacementChars.length));
    // });
    //   console.log(modSlug)


  async getPost(slug) {
    try {
      console.log(slug);
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite error detected at :: getPost", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite error detected at :: getPosts", error);
      return false;
    }
  }

  async createPost({ title,slug, content, featuredImage, status, userId }) {
    try {
      console.log(slug);
      console.log(userId);
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log("Appwrite  detected at :: getPosts", error);
      return false;
    }
  }
  async updatePosts(slug, { title, featuredImage, content, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, featuredImage, content, status }
      );
    } catch (error) {
      console.log("Appwrite error detected at :: updatePosts", error);
      return false;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
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
    return this.bucket.getFilePreview(conf.appwriteBucketId, FileId);
  }
}
const service = new Service();
export default service;
