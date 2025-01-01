import express from "express";
import { addProfile, logIn,signUp } from "../controllers/auth";

const router=express.Router();

router.post('/sign-up',signUp);

router.post('/log-in',logIn);

router.post('/add-profile',addProfile);

export default router;