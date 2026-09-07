import { Router } from "express";
import { getDemoData, getError } from "../controllers/demoController.js";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello there, this is a nodejs api exmaple using typescript');
});

router.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

router.get("/demo", getDemoData);
router.get("/error", getError);

export default router;