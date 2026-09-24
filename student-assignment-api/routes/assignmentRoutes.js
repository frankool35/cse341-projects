import express from "express";

import {
    getAssignments,
    getAssignment,
    createNewAssignment,
    updateExistingAssignment,
    removeAssignment
} from "../controllers/assignmentController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getAssignments);

router.get("/:id", requireAuth, getAssignment);

router.post("/", requireAuth, createNewAssignment);

router.put("/:id", requireAuth, updateExistingAssignment);

router.delete("/:id", requireAuth, removeAssignment);

export default router;