import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export const updateSearchCount = async (searcTerm, movie) => {
    //check if the movie already exists in the database 
    try{
        const result = 
    }catch(e){
        console.error(e)
    }
}


