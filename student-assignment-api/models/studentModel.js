import { ObjectId } from "mongodb";
import { connectToDatabase } from "../config/db.js";

export async function getAllStudents() {
    const db = await connectToDatabase();

    return await db.collection("students").find().toArray();
}

export async function getStudentById(id) {
    const db = await connectToDatabase();

    return await db.collection("students").findOne({
        _id: new ObjectId(id)
    });
}

export async function createStudent(student) {
    const db = await connectToDatabase();

    return await db.collection("students").insertOne(student);
}

export async function updateStudent(id, student) {
    const db = await connectToDatabase();

    return await db.collection("students").updateOne(
        { _id: new ObjectId(id) },
        { $set: student }
    );
}

export async function deleteStudent(id) {
    const db = await connectToDatabase();

    return await db.collection("students").deleteOne({
        _id: new ObjectId(id)
    });
}