import dns from "node:dns";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
   
    serverSelectionTimeoutMS: 10000
});

let db;

export async function connectToDatabase() {
    if (db) {
        return db;
    }

    try {
        await client.connect();

        db = client.db("cse341");

        console.log("MongoDB connected successfully!");

        return db;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}