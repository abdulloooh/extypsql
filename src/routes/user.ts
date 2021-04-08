import { Router } from "express";
const router = Router();
import * as user from "../controllers/user.controller";

router.get("/me", user.getUser);

router.post("/register", user.registerUser);

export default router;
