import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
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

export async function createNewContact(req, res) {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    try {
        const result = await createContact({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        res.status(201).json({
            id: result.insertedId.toString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to create contact"
        });
    }
}

export async function updateExistingContact(req, res) {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    try {
        const result = await updateContact(req.params.id, {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        if (!result.matchedCount) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Invalid contact ID"
        });
    }
}

export async function removeContact(req, res) {
    try {
        const result = await deleteContact(req.params.id);

        if (!result.deletedCount) {
            return res.status(404).json({
                error: "Contact not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "Invalid contact ID"
        });
    }
}