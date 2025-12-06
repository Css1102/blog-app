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
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  setJWT(jwt) {
    if (jwt) {
      console.log("verifying jwt");
      this.client.setJWT(jwt);
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);
    }
  }

  clearJWT() {
    this.client.setJWT(null);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async safeCall(fn, ...args) {
    try {
      return await fn(...args);
    } catch (error) {
      if (error.code === 401) {
        this.clearJWT();
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
      console.error("Appwrite error:", error);
      throw error;
    }
  }

  async getPost(slug) {
    return this.safeCall(
      this.databases.getDocument.bind(this.databases),
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      slug
    );
  }

  async getPosts(userId, queries = [Query.equal("status", "active")]) {
    return this.safeCall(
      this.databases.listDocuments.bind(this.databases),
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      queries
    );
  }

  async createPost({ title, slug, content, featuredImage, attachedTag, status, userId, Author, Publish_Date }) {
    return this.safeCall(
      this.databases.createDocument.bind(this.databases),
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      ID.unique(),
      { title, content, featuredImage, status, userId, Author, Publish_Date, tag:attachedTag }
    );
  }

  async updatePosts(slug, { title, featuredImage, content, attachedTag, status, Author, Publish_Date }) {
    return this.safeCall(
      this.databases.updateDocument.bind(this.databases),
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      slug,
      { title, featuredImage, content, status, Author, Publish_Date, tag: attachedTag }
    );
  }

  async deletePost(slug) {
    return this.safeCall(
      this.databases.deleteDocument.bind(this.databases),
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      slug
    );
  }

  // storage service
  async uploadFile(File) {
    return this.safeCall(
      this.bucket.createFile.bind(this.bucket),
      conf.appwriteBucketId,
      ID.unique(),
      File
    );
  }

  async deleteFile(FileId) {
    return this.safeCall(
      this.bucket.deleteFile.bind(this.bucket),
      conf.appwriteBucketId,
      FileId
    );
  }

  getFilePreview(FileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, FileId);
  }

  async createUpvote({ postId, userId }) {
    try {
      const existing = await this.safeCall(
        this.databases.listDocuments.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_three_Id,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
      );

      if (existing.total > 0) {
        throw new Error("You've already upvoted this post.");
      }

      await this.safeCall(
        this.databases.createDocument.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_three_Id,
        ID.unique(),
        { postId, userId }
      );

      const post = await this.safeCall(
        this.databases.getDocument.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        postId
      );

      await this.safeCall(
        this.databases.updateDocument.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        postId,
        { Upvotes: post.Upvotes + 1 }
      );

      toast.success("Upvoted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async canUserCreatePost({ userId }) {
    try {
      const posts = await this.safeCall(
        this.databases.listDocuments.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        [Query.equal("userId", userId)]
      );

      if (posts.total === 0) return true;

      const filteredPosts = posts.documents.some((post) => post.Upvotes >= 2);
      return filteredPosts;
    } catch (error) {
      console.log("error checking post eligibility", error);
      return false;
    }
  }

  async downVote({ postId, userId }) {
    try {
      const upvoteRecord = await this.safeCall(
        this.databases.listDocuments.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_three_Id,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
      );

      if (upvoteRecord.total === 0) {
        throw new Error("You haven't upvoted this post.");
      }

      const post = await this.safeCall(
        this.databases.getDocument.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        postId
      );

      if ((post.Upvotes || 0) <= 0) {
        throw new Error("Cannot downvote a post with zero Upvotes.");
      }

      await this.safeCall(
        this.databases.updateDocument.bind(this.databases),
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        postId,
        { Upvotes: post.Upvotes - 1 }
      );

      await this.safeCall(
        this.databases.deleteDocument.bind(this.databases),
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

  async upvoteSlug({ userId, postId }) {
    const posts = await this.safeCall(
      this.databases.listDocuments.bind(this.databases),
      conf.appwriteDatabaseId,
      conf.appwriteCollection_three_Id,
      [Query.equal("postId", postId), Query.equal("userId", userId)]
    );
    return posts.total > 0;
  }
}

const appwriteService = new Service();
export default appwriteService;
