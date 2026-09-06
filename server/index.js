import dns from "node:dns";

// Fix MongoDB Atlas DNS/SRV resolution issue
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./config/db.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import websiteRouter from "./routes/website.routes.js";
import billingRouter from "./routes/billing.routes.js";

import { stripeWebhook } from "./controllers/stripeWebhook.controller.js";

// Load environment variables
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;


// ======================================================
// STRIPE WEBHOOK
// IMPORTANT: webhook route must come BEFORE express.json()
// ======================================================

app.post(
    "/api/stripe/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());

app.use(cookieParser());

app.use(
    cors({
        origin: "https://aiwebsitebuilder-e540.onrender.com",
        credentials: true,
    })
);


// ======================================================
// ROUTES
// ======================================================

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/website", websiteRouter);

app.use("/api/billing", billingRouter);


// ======================================================
// START SERVER
// ======================================================

app.listen(port, async () => {
    console.log(`Server started on port ${port}`);

    try {
        await connectDb();
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
});
