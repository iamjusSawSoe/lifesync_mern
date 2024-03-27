import express from "express";
import { checkSchema } from "express-validator";
import * as NotesController from "../controllers/notes.controller";
import * as NoteValidations from "../validators/notesValidator";

const router = express.Router();

router.get("/", checkSchema(NoteValidations.createNoteValidationSchema), NotesController.getNotes);

// router.get("/:id", NotesController.findNote);

router.post("/", NotesController.addNotes);

// router.delete("/:id", NotesController.deleteNotes);

// router.patch("/:id", NotesController.updateNotes);

export default router;
