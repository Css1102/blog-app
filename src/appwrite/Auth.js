import conf from "../conf/conf.js";
import { Client, Account, ID, Databases,Permission, Role,Query} from "appwrite";
import crypto from "crypto";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    this.databases=new Databases(this.client)
  }

  async createJWT() {
  try {
    const jwt = await this.account.createJWT();
    return jwt; 
  } catch (error) {
    console.error("JWT creation failed:", error);
    throw error;
  }
}
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log(userAccount);
      await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollection_one_Id,
      ID.unique(),
      {username:name,email:email,userId:userAccount.$id},
  //       [
  //   Permission.read(Role.user(userAccount.$id)),
  //   Permission.write(Role.user(userAccount.$id))
  // ]
      )
if (userAccount) {
  return { success: true, message: "Account created. Please log in." };
} 
   } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async loginAccount({ email, password }) {
    try  {
      const session = await this.account.createEmailPasswordSession(email, password);
    const userAccount=await this.account.get()
    console.log(userAccount)
    const userDocs = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollection_one_Id, [
      Query.equal("userId", userAccount.$id),
    ]);

    if (userDocs.total === 0) {
      throw new Error("User not found in database");

    }  

      return {
      session,
      user: userDocs.documents[0],
    };
  }catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
  try {
      const session = await this.account.getSession("current");
    if (!session) return null;
    const account = await this.account.get();
    console.log(account)
    const userDocs = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollection_one_Id, [
      Query.equal("userId", account.$id),
    ]);
    if (userDocs.total === 0) return null;
    return userDocs.documents[0]; 
  } catch (err) {
    console.error("Session restore failed:", err);
    return null;
  }
}
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite servce :: logout():: ", error);
    }
  }
}

// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('<PROJECT_ID>');

// const account = new Account(client);

const AuthServiceObj = new AuthService();
export default AuthServiceObj;
