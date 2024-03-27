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

// export const findNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
//   const noteId = req.params.id;

//   try {
//     if (!noteId) throw createHttpError(400, "Note ID is required");

//     const note = dummyData.find((note) => note.id === parseInt(noteId));

//     if (!note) throw createHttpError(404, "Note not found");
//     console.log(note);

//     res.status(200).json({
//       code: 200,
//       data: note,
//       message: "Hello World!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

interface CreateNoteBody {
  title: string;
  content: string;
}

export const addNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
  const { content, title } = req.body;
  const result = validationResult(req);

  console.log(result);

  try {
    if (!result.isEmpty()) throw createHttpError(400, result.array());
    if (!title) throw createHttpError(400, "Title is required");
    if (!content) throw createHttpError(400, "Content is required");

    // const newNote = {
    //   title,
    //   content,
    // };

    // const notes = await NoteModel.create({ title: newNote.title, content: newNote.content });

    res.status(201).json({
      code: 201,
      data: "",
      message: "Note added successfully!",
    });
  } catch (error) {
    next(error);
  }
};

// interface UpdateNoteParams {
//   id: string;
// }

// export const updateNotes: RequestHandler<UpdateNoteParams, unknown, CreateNoteBody, unknown> = async (
//   req,
//   res,
//   next,
// ) => {
//   const { id } = req.params;
//   const { content, title } = req.body;

//   try {
//     if (!id) throw createHttpError(400, "noteId is required");
//     if (!title) throw createHttpError(400, "Title is required");
//     if (!content) throw createHttpError(400, "Content is required");

//     const checkAvailableNote = dummyData.findIndex((note) => note.id === parseInt(id));

//     if (checkAvailableNote === -1) throw createHttpError(404, "Note not found");

//     dummyData[checkAvailableNote] = {
//       ...dummyData[checkAvailableNote],
//       title,
//       content,
//     };

//     res.status(200).json({ success: true, data: dummyData, message: "Note updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteNotes: RequestHandler = async (req, res, next) => {
//   const noteId = req.params.id;

//   try {
//     if (!noteId) throw createHttpError(400, "noteId is required");

//     const updatedData = dummyData.filter((note) => note.id !== parseInt(noteId));

//     res.status(201).json({
//       code: 200,
//       data: updatedData,
//       message: "Note delete successfully!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
