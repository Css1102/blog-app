const conf={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollection_two_Id:String(import.meta.env.VITE_APPWRITE_COLLECTION_2_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteCollection_one_Id:String(import.meta.env.VITE_APPWRITE_COLLECTION_1_ID),
    appwriteCollection_three_Id:String(import.meta.env.VITE_APPWRITE_COLLECTION_3_ID)
}
export default conf;