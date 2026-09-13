import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

import { setupSwagger } from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/students", studentRoutes);
app.use("/assignments", assignmentRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Student Assignment Tracker API is running."
    });
});

async function startServer() {
    try {
        await connectToDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
}

startServer();