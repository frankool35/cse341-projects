import {
    getAllAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from "../models/assignmentModel.js";
import { ObjectId } from "mongodb";

function validateAssignment(data) {
    const {
        assignmentId,
        title,
        description,
        course,
        studentId,
        dueDate,
        maxScore,
        status,
        submissionUrl
    } = data;

    if (
        !assignmentId ||
        !title ||
        !description ||
        !course ||
        !studentId ||
        !dueDate ||
        maxScore === undefined ||
        !status ||
        !submissionUrl
    ) {
        return "All assignment fields are required.";
    }

    if (Number.isNaN(Number(maxScore)) || Number(maxScore) <= 0) {
        return "maxScore must be a number greater than 0.";
    }

    const validStatuses = ["assigned", "submitted", "graded", "overdue"];

    if (!validStatuses.includes(String(status).toLowerCase())) {
        return "Status must be assigned, submitted, graded, or overdue.";
    }

    const date = new Date(dueDate);

    if (Number.isNaN(date.getTime())) {
        return "Please provide a valid due date.";
    }

    if (
        submissionUrl !== "none" &&
        !/^https?:\/\/.+/i.test(submissionUrl)
    ) {
        return "submissionUrl must be a valid URL or 'none'.";
    }

    return null;
}

export async function getAssignments(req, res) {
    try {
        const assignments = await getAllAssignments();

        return res.status(200).json(assignments);
    } catch (error) {
        console.error("Error getting assignments:", error);

        return res.status(500).json({
            error: "Failed to retrieve assignments."
        });
    }
}

export async function getAssignment(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid assignment ID."
            });
        }

        const assignment = await getAssignmentById(id);

        if (!assignment) {
            return res.status(404).json({
                error: "Assignment not found."
            });
        }

        return res.status(200).json(assignment);
    } catch (error) {
        console.error("Error getting assignment:", error);

        return res.status(500).json({
            error: "Failed to retrieve assignment."
        });
    }
}

export async function createNewAssignment(req, res) {
    try {
        const validationError = validateAssignment(req.body);

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const assignment = {
            assignmentId: req.body.assignmentId.trim(),
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            course: req.body.course.trim(),
            studentId: req.body.studentId.trim(),
            dueDate: new Date(req.body.dueDate),
            maxScore: Number(req.body.maxScore),
            status: String(req.body.status).trim().toLowerCase(),
            submissionUrl: req.body.submissionUrl.trim()
        };

        const result = await createAssignment(assignment);

        return res.status(201).json({
            message: "Assignment created successfully.",
            id: result.insertedId
        });
    } catch (error) {
        console.error("Error creating assignment:", error);

        return res.status(500).json({
            error: "Failed to create assignment."
        });
    }
}

export async function updateExistingAssignment(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid assignment ID."
            });
        }

        const validationError = validateAssignment(req.body);

        if (validationError) {
            return res.status(400).json({
                error: validationError
            });
        }

        const assignment = {
            assignmentId: req.body.assignmentId.trim(),
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            course: req.body.course.trim(),
            studentId: req.body.studentId.trim(),
            dueDate: new Date(req.body.dueDate),
            maxScore: Number(req.body.maxScore),
            status: String(req.body.status).trim().toLowerCase(),
            submissionUrl: req.body.submissionUrl.trim()
        };

        const result = await updateAssignment(id, assignment);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: "Assignment not found."
            });
        }

        return res.status(200).json({
            message: "Assignment updated successfully."
        });
    } catch (error) {
        console.error("Error updating assignment:", error);

        return res.status(500).json({
            error: "Failed to update assignment."
        });
    }
}

export async function removeAssignment(req, res) {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "Invalid assignment ID."
            });
        }

        const result = await deleteAssignment(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: "Assignment not found."
            });
        }

        return res.status(200).json({
            message: "Assignment deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting assignment:", error);

        return res.status(500).json({
            error: "Failed to delete assignment."
        });
    }
}