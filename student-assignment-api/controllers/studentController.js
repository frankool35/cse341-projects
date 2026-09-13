import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from "../models/studentModel.js";
import { ObjectId } from "mongodb";

function validateStudent(data) {
    const { studentId, firstName, lastName, email, phone, program, level, status } = data;

    if (
        !studentId ||
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !program ||
        !level ||
        !status
    ) {
        return "All student fields are required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return "Please provide a valid email address.";
    }

    const validLevels = ["100", "200", "300", "400", "500"];

    if (!validLevels.includes(String(level))) {
        return "Level must be 100, 200, 300, 400, or 500.";
    }

    const validStatuses = ["active", "inactive"];

    if (!validStatuses.includes(String(status).toLowerCase())) {
        return "Status must be active or inactive.";
    }

    return null;
}

export async function getStudents(req, res) {
    try {
        const students = await getAllStudents();
        return res.status(200).json(students);
    } catch (error) {
        console.error("Error getting students:", error);
        return res.status(500).json({
            error: "Failed to retrieve students."
        });
    }
}

export async function getStudent(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid student ID."
            });
        }

        const student = await getStudentById(id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found."
            });
        }

        return res.status(200).json(student);
    } catch (error) {
        console.error("Error getting student:", error);
        return res.status(500).json({
            error: "Failed to retrieve student."
        });
    }
}

export async function createNewStudent(req, res) {
    try {
        const validationError = validateStudent(req.body);

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const student = {
            studentId: req.body.studentId.trim(),
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: req.body.phone.trim(),
            program: req.body.program.trim(),
            level: String(req.body.level).trim(),
            status: String(req.body.status).trim().toLowerCase()
        };

        const result = await createStudent(student);

        return res.status(201).json({
            message: "Student created successfully.",
            id: result.insertedId
        });
    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({
            error: "Failed to create student."
        });
    }
}

export async function updateExistingStudent(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid student ID."
            });
        }

        const validationError = validateStudent(req.body);

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const student = {
            studentId: req.body.studentId.trim(),
            firstName: req.body.firstName.trim(),
            lastName: req.body.lastName.trim(),
            email: req.body.email.trim().toLowerCase(),
            phone: req.body.phone.trim(),
            program: req.body.program.trim(),
            level: String(req.body.level).trim(),
            status: String(req.body.status).trim().toLowerCase()
        };

        const result = await updateStudent(id, student);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: "Student not found."
            });
        }

        return res.status(200).json({
            message: "Student updated successfully."
        });
    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({
            error: "Failed to update student."
        });
    }
}

export async function removeStudent(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid student ID."
            });
        }

        const result = await deleteStudent(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Student not found."
            });
        }

        return res.status(200).json({
            message: "Student deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({
            error: "Failed to delete student."
        });
    }
}