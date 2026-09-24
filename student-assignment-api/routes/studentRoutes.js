import express from "express";

import {
    getStudents,
    getStudent,
    createNewStudent,
    updateExistingStudent,
    removeStudent
} from "../controllers/studentController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getStudents);

router.get("/:id", requireAuth, getStudent);

router.post("/", requireAuth, createNewStudent);

router.put("/:id", requireAuth, updateExistingStudent);

router.delete("/:id", requireAuth, removeStudent);

export default router;