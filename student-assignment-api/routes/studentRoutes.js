import express from "express";

import {
    getStudents,
    getStudent,
    createNewStudent,
    updateExistingStudent,
    removeStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);
router.get("/:id", getStudent);

router.post("/", createNewStudent);
router.put("/:id", updateExistingStudent);
router.delete("/:id", removeStudent);

export default router;