import express from "express";
import { dalleControler } from "../controllers/dalle.js";
const router = express.Router();

router.post('/',dalleControler)

export default router;