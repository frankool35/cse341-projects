import { ObjectId } from "mongodb";
import { connectToDatabase } from "../config/db.js";

export async function getAllAssignments() {
    const db = await connectToDatabase();

    return await db.collection("assignments").find().toArray();
}

export async function getAssignmentById(id) {
    const db = await connectToDatabase();

    return await db.collection("assignments").findOne({
        _id: new ObjectId(id)
    });
}

export async function createAssignment(assignment) {
    const db = await connectToDatabase();

    return await db.collection("assignments").insertOne(assignment);
}

export async function updateAssignment(id, assignment) {
    const db = await connectToDatabase();

    return await db.collection("assignments").updateOne(
        { _id: new ObjectId(id) },
        { $set: assignment }
    );
}

export async function deleteAssignment(id) {
    const db = await connectToDatabase();

    return await db.collection("assignments").deleteOne({
        _id: new ObjectId(id)
    });
}