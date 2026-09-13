import express from "express";

import {
    getAssignments,
    getAssignment,
    createNewAssignment,
    updateExistingAssignment,
    removeAssignment
} from "../controllers/assignmentController.js";

const router = express.Router();

router.get("/", getAssignments);
router.get("/:id", getAssignment);

router.post("/", createNewAssignment);
router.put("/:id", updateExistingAssignment);
router.delete("/:id", removeAssignment);

export default router;