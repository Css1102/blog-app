import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
client=new Client();
account;
constructor(){
this.client.setEndpoint(conf.appwriteUrl).
setProject(conf.appwriteProjectId);

this.account=new Account(this.client)
}

async createAccount({email,password,name}){
try{
const userAccount=await this.account.create(ID.unique(),email,password,name);
console.log(userAccount)
if(userAccount){
return await this.loginAccount({email,password});
}
else{
return userAccount;
}
}
catch(error){
console.log(error)
throw error
}
}
async loginAccount({email,password}){
try{
 return await this.account.createEmailPasswordSession(email,password);

}
catch(error){
throw error
}
}
async getCurrentUser(){
try{
return await this.account.get();
}
catch(error){
console.log("Appwrite servce :: getCurrentUser():: ",error);
}
return null;
}
async logout(){
try{
return await this.account.deleteSessions();
}
catch(error){
    console.log("Appwrite servce :: logout():: ",error)
}
}


};

// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') 
//     .setProject('<PROJECT_ID>');               

// const account = new Account(client);

const AuthServiceObj=new AuthService();
export default AuthServiceObj;