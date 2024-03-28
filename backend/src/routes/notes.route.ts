import express from "express";
import { checkSchema } from "express-validator";
import * as NotesController from "../controllers/notes.controller";
import * as NoteSchema from "../validators/notesValidator";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:id", checkSchema(NoteSchema.findDeleteNoteValidationSchema), NotesController.findNote);

router.post("/", NotesController.addNotes);

router.delete("/:id", checkSchema(NoteSchema.findDeleteNoteValidationSchema), NotesController.deleteNotes);

router.patch("/:id", checkSchema(NoteSchema.updateNoteValidationSchema), NotesController.updateNotes);

export default router;
