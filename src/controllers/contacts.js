import {
    getAllContacts,
    getContactById
} from "../models/contacts.js";

export async function getContacts(req, res) {
    try {
        const contacts = await getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve contacts" });
    }
}

export async function getContact(req, res) {
    try {
        const contact = await getContactById(req.params.id);

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Invalid contact ID" });
    }
}