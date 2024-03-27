import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema({ title: { type: String, required: true }, content: { type: String, required: true } });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);
