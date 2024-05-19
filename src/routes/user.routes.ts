import express from "express";
import { createUser, deleteUser, findAUser, getAllUser, updateUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.get("/users", getAllUser);
router.get("/user/:id", findAUser);
router.delete("/user/:id", deleteUser);

export default router;