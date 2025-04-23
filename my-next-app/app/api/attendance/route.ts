import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Connection URL (replace with your own MongoDB connection string)
const uri = 'mongodb+srv://21ume043:FeM9C9sHfoxe3M0l@cluster0.f3st2.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

export async function GET(request: Request) {
  // Retrieve the `username` from the query parameters
  const url = new URL(request.url);
  const username = url.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
  }

  try {
    await client.connect();
    const db = client.db("face_recognition_db"); // Replace with your database name
    const collection = db.collection("face_recognition"); // Replace with your collection name

    // Fetch attendance records for the specific user
    const attendanceData = await collection.find({ person_name: username }).toArray();

    return NextResponse.json(attendanceData); // Return attendance data for the logged-in student
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
  } finally {
    await client.close();
  }
}
