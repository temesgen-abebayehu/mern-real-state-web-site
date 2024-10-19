import express  from "express";
import { google, login, logOut, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.get('/logout', logOut);

export default router;