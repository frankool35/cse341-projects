import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function connectToDatabase() {
    if (db) {
        return db;
    }

    try {
        await client.connect();

        db = client.db(process.env.DB_NAME);

        console.log("MongoDB connected successfully!");

        return db;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}