import mongoose, { Schema } from "mongoose";
import { quizResultSchema } from "./quizResult.schema.js";

export const sectionProgressSchema = new Schema({
  sectionId: {
    type: Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  itemsCompleted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  quizResults: [quizResultSchema],
});
