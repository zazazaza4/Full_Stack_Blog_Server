import { Router } from "express";
import { createCategory, getAll } from "../сontrollers/categories.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

//Create Category
router.post("/", checkAuth, createCategory);

//Get All Categories
router.get("/", getAll);

export default router;
