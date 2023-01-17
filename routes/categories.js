import { Router } from "express";
import { createCategory, getAll } from "../Controllers/categories.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

//Create Category
router.post("/", checkAuth, createCategory);

//Get All Categories
router.get("/", getAll);

export default router;
