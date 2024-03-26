import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:id", NotesController.findNote);

router.post("/", NotesController.addNotes);

router.delete("/:id", NotesController.deleteNotes);

router.patch("/:id", NotesController.updateNotes);

export default router;
