import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID, Permission, Role } from "appwrite";
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

  // ✅ Bug 1 fixed: actually calls getDocument with await
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        slug
      );
    } catch (error) {
      console.log("Appwrite error :: getPost", error);
      return null;
    }
  }

async getPosts(userId = null) {
  try {
    const queries = [Query.equal("status", "active")];
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_two_Id,
      queries
    );
  } catch (error) {
    console.log("Appwrite error :: getPosts", error);
    return false;
  }
}

  async createPost({ title, slug, content, featuredImage, attachedTag, status, userId, Author, Publish_Date }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        slug || ID.unique(),   
        { title, content, featuredImage, status, userId, Author, Publish_Date, tag: attachedTag },
        [
          Permission.read(Role.any()),            
          Permission.update(Role.user(userId)),    
          Permission.delete(Role.user(userId)),    
        ]
      );
    } catch (error) {
      console.log("Appwrite error :: createPost", error);
      return false;
    }
  }

  // ✅ Bug 1 fixed: actually calls updateDocument with await
  async updatePosts(slug, { title, featuredImage, content, attachedTag, status, Author, Publish_Date }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        slug,
        { title, featuredImage, content, status, Author, Publish_Date, tag: attachedTag }
      );
    } catch (error) {
      console.log("Appwrite error :: updatePosts", error);
      return false;
    }
  }

  // ✅ Bug 1 fixed: actually calls deleteDocument with await
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite error :: deletePost", error);
      return false;
    }
  }

  // ✅ Bug 1 fixed: actually calls createFile with await
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite error :: uploadFile", error);
      return false;
    }
  }

  // ✅ Bug 1 fixed: actually calls deleteFile with await
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.log("Appwrite error :: deleteFile", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }

  // ✅ Bug 2 fixed: replaced this.safeCall() with direct await calls
  async createUpvote({ postId, userId }) {
    try {
      const existing = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_three_Id,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
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

      const post = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        postId
      );

      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        postId,
        { Upvotes: (post.Upvotes || 0) + 1 }
      );

      toast.success("Upvoted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to upvote.");
    }
  }

  // ✅ Bug 2 fixed: replaced this.safeCall() with direct await calls
  async canUserCreatePost({ userId }) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_two_Id,
        [Query.equal("userId", userId)]
      );

      if (posts.total === 0) return true;

      return posts.documents.some((post) => post.Upvotes >= 2);
    } catch (error) {
      console.log("Error checking post eligibility", error);
      return false;
    }
  }

  // ✅ Bug 2 fixed: replaced this.safeCall() with direct await calls
  async downVote({ postId, userId }) {
    try {
      const upvoteRecord = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_three_Id,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
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
        throw new Error("Cannot downvote a post with zero upvotes.");
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

  // ✅ Bug 2 fixed: replaced this.safeCall() with direct await call
  async upvoteSlug({ userId, postId }) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollection_three_Id,
        [Query.equal("postId", postId), Query.equal("userId", userId)]
      );
      return posts.total > 0;
    } catch (error) {
      console.log("Appwrite error :: upvoteSlug", error);
      return false;
    }
  }
}

const appwriteService = new Service();
export default appwriteService;