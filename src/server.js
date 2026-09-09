import express from "express";
import { connectToDatabase } from "./db.js";
import contactsRoutes from "./routes/contacts.js";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" with { type: "json" };

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/contacts", contactsRoutes);
app.get("/", (req, res) => {
    res.send("Contacts API is running!");
});

const PORT = process.env.PORT || 8080;

async function startServer() {
    try {
        await connectToDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer();