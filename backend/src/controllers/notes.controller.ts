import { NextFunction, Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import NoteModel from "../models/notes";

export const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json({
      code: 200,
      data: notes,
      message: "Hello World!",
    });
  } catch (error) {
    next(error);
  }
};

export const findNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.id;

  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) throw createHttpError(400, errors.array()[0].msg);

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not found");

    res.status(200).json({
      code: 200,
      data: note,
      message: "Hello World!",
    });
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title: string;
  content: string;
}

export const addNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const { content, title } = req.body;

  try {
    if (typeof title !== "string") throw createHttpError(400, "Title must be a string");
    if (typeof content !== "string") throw createHttpError(400, "Content must be a string");
    if (!title) throw createHttpError(400, "Title is required");
    if (!content) throw createHttpError(400, "Content is required");

    const newNote = {
      title,
      content,
    };

    const notes = await NoteModel.create({ title: newNote.title, content: newNote.content });

    res.status(201).json({
      code: 201,
      data: notes,
      message: "Note added successfully!",
    });
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  id: string;
}

export const updateNotes: RequestHandler<UpdateNoteParams, unknown, CreateNoteBody, Record<string, any>> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const { content, title } = req.body;

  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) throw createHttpError(400, errors.array()[0].msg);

    const note = await NoteModel.findById(id).exec();

    if (!note) throw createHttpError(404, "Note not found");

    console.log(note);

    note.title = title;
    note.content = content;

    await note.save();

    res.status(200).json({ code: 200, message: "Note updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteNotes: RequestHandler<UpdateNoteParams, unknown, unknown, Record<string, any>> = async (
  req,
  res,
  next,
) => {
  const noteId = req.params.id;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) throw createHttpError(400, errors.array()[0].msg);

    const note = await NoteModel.findById(noteId).exec();

    if (!note) throw createHttpError(404, "Note not found");

    await note.deleteOne();

    res.status(200).json({
      code: 201,
      message: "Note delete successfully!",
    });
  } catch (error) {
    next(error);
  }
};
