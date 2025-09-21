// This version works with Appwrite SDK 17.0.2
import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try{
        console.log('Function called with:', { searchTerm, movie });
        console.log('Environment vars:', { 
            DATABASE_ID, 
            COLLECTION_ID,
            endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT 
        });
        
        // Check if document exists
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('searchTerm', searchTerm)]
        );
        
        console.log('Query result:', result);
        
        if(result.documents.length > 0){
            // Update existing document
            const doc = result.documents[0];
            console.log('Found existing document, updating count from', doc.count, 'to', doc.count + 1);
            
            const updatedDoc = await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                doc.$id,
                {
                    count: doc.count + 1
                }
            );
            console.log('Document updated:', updatedDoc);
            return updatedDoc;
        } else{
            // Create new document
            console.log('No existing document found, creating new one');
            
            const newDoc = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            );
            console.log('New document created:', newDoc);
            return newDoc;
        }
    }catch(error){
        console.error('Error in updateSearchCount:', error);
        
        // More detailed error logging
        if(error.code) {
            console.error('Error code:', error.code);
        }
        if(error.type) {
            console.error('Error type:', error.type);
        }
        if(error.response) {
            console.error('Error response:', error.response);
        }
        
        throw error; // Re-throw so calling code knows there was an error
    }
}