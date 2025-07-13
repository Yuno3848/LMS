import mongoose, { Schema } from "mongoose";
import { attemptSchema } from "./attemptSchema.schema";

export const quizResultSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  attempts: [attemptSchema],
});
