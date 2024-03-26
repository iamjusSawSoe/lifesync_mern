import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

const dummyData = [
  {
    id: 1,
    title: "The Godfather",
    content: "A classic crime film directed by Francis Ford Coppola.",
  },
  {
    id: 2,
    title: "Pan's Labyrinth",
    content: "A dark fantasy film directed by Guillermo del Toro, set in post-Civil War Spain.",
  },
  {
    id: 3,
    title: "Spirited Away",
    content:
      "An animated fantasy film directed by Hayao Miyazaki, exploring the journey of a young girl in a magical world.",
  },
  {
    id: 4,
    title: "Parasite",
    content: "A South Korean black comedy thriller film directed by Bong Joon-ho, addressing class discrimination.",
  },
  {
    id: 5,
    title: "12 Angry Men",
    content:
      "A courtroom drama film directed by Sidney Lumet, focusing on the deliberations of a jury in a murder trial.",
  },
  {
    id: 6,
    title: "Inception",
    content:
      "A science fiction action film directed by Christopher Nolan, exploring the concept of dreams within dreams.",
  },
];

export const getNotes: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    code: 200,
    data: dummyData,
    message: "Hello World!",
  });
};

export const findNote: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = req.params.id;

  try {
    if (!noteId) throw createHttpError(400, "Note ID is required");

    const note = dummyData.find((note) => note.id === parseInt(noteId));

    if (!note) throw createHttpError(404, "Note not found");
    console.log(note);

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
    if (!title) throw createHttpError(400, "Title is required");
    if (!content) throw createHttpError(400, "Content is required");

    const newNote = {
      id: Math.floor(Math.random() * 1000000000),
      title,
      content,
    };

    dummyData.push(newNote);

    res.status(201).json({
      code: 201,
      data: newNote,
      message: "Note added successfully!",
    });
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  id: string;
}

export const updateNotes: RequestHandler<UpdateNoteParams, unknown, CreateNoteBody, unknown> = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;
  const { content, title } = req.body;

  try {
    if (!id) throw createHttpError(400, "noteId is required");
    if (!title) throw createHttpError(400, "Title is required");
    if (!content) throw createHttpError(400, "Content is required");

    const checkAvailableNote = dummyData.findIndex((note) => note.id === parseInt(id));

    if (checkAvailableNote === -1) throw createHttpError(404, "Note not found");

    dummyData[checkAvailableNote] = {
      ...dummyData[checkAvailableNote],
      title,
      content,
    };

    res.status(200).json({ success: true, data: dummyData, message: "Note updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteNotes: RequestHandler = async (req, res, next) => {
  const noteId = req.params.id;

  try {
    if (!noteId) throw createHttpError(400, "noteId is required");

    const updatedData = dummyData.filter((note) => note.id !== parseInt(noteId));

    res.status(201).json({
      code: 200,
      data: updatedData,
      message: "Note delete successfully!",
    });
  } catch (error) {
    next(error);
  }
};
