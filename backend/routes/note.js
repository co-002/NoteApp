import express from "express";
import {
  allNotes,
  create,
  updateNote,
  deleteNote,
  shareNote,
} from "../controllers/note.js";
import { authMiddleware } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create", authMiddleware, create);
router.get("/allNotes", authMiddleware, allNotes);
router.put("/updateNote/:id", authMiddleware, updateNote);
router.delete("/deleteNote/:id", authMiddleware, deleteNote);
router.post("/shareNote/:id", authMiddleware, shareNote);

export default router;
