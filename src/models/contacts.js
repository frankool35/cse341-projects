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

export async function createContact(contact) {
    const db = await connectToDatabase();

    return await db
        .collection("contacts")
        .insertOne(contact);
}

export async function updateContact(id, contact) {
    const db = await connectToDatabase();

    return await db
        .collection("contacts")
        .updateOne(
            { _id: new ObjectId(id) },
            { $set: contact }
        );
}

export async function deleteContact(id) {
    const db = await connectToDatabase();

    return await db
        .collection("contacts")
        .deleteOne({ _id: new ObjectId(id) });
}