import type { Request, Response } from "express";
import { logger } from "../utils/logger.js";

const demoData = {
    id: "3",
    text: "Some demo data."
}

export async function getDemoData(req: Request, res: Response): Promise<void> {
    try {

        logger.info("Demo data api endpoint called...", {
            route: req.originalUrl,
            method: req.method,
        });

        res.status(200);
        res.json(demoData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"

        logger.error("Failed to get demo data", {
            route: req.originalUrl,
            method: req.method,
            error: errorMessage
        });

        res.status(500).json({ error: errorMessage })
    }
}