import { connectToDatabase } from "../db.js";
import { ObjectId } from "mongodb";

export async function getAllContacts() {
    const db = await connectToDatabase();

    return await db
        .collection("contacts")
        .find()
        .toArray();
}

export async function getContactById(id) {
    const db = await connectToDatabase();

    return await db
        .collection("contacts")
        .findOne({ _id: new ObjectId(id) });
}