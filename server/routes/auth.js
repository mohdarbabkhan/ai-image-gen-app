import express from "express";
import {signin,signup,googleSignin} from "../controllers/auth.js"
const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/googlelogin',googleSignin)

export default router;