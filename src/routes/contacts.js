import express from "express";

import {
    getContacts,
    getContact,
    createNewContact,
    updateExistingContact,
    removeContact
} from "../controllers/contacts.js";

const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getContact);

router.post("/", createNewContact);
router.put("/:id", updateExistingContact);
router.delete("/:id", removeContact);

export default router;