import express from "express";
import {getAllUsers, getUser, postUser, deleteUser, updateUser} from "../controllers/Users.controller.js";

const router = express.Router();

router.get("/",  getAllUsers)
router.get("/:id", getUser)
router.post("/", postUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)

export default router;