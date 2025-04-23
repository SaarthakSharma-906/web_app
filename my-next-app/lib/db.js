import { MongoClient } from 'mongodb';

export const query = async (dbName, collectionName) => {
  const uri = 'mongodb+srv://21ume043:FeM9C9sHfoxe3M0l@cluster0.f3st2.mongodb.net/?retryWrites=true&w=majority'; // Your MongoDB URI
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Fetch all documents in the collection
    const result = await collection.find({}).toArray();  // Replace with your specific query if necessary

    return result;
  } catch (error) {
    console.error('Error while querying MongoDB:', error);

  } finally {
    await client.close();
  }
};
