import { z } from "zod";

export const answerSchema = z.object({
  id: z.string(),
  answer: z.string().trim().min(10),
});

export const questionSchema = z.object({
  id: z.string(),
  question: z.string().trim().min(10, "Must be at least 10 characters long"),
  description: z.string().trim().min(50, "Must be at least 50 characters long"),
  category: z.string().trim().min(5, "Must selection a option"),
  dueDate: z.string().trim().min(5, "¡oops!, must set an expiration date"),
  answers: z.array(answerSchema),
});

export type AnswerSchema = z.infer<typeof answerSchema>;
export type QuestionSchema = z.infer<typeof questionSchema>;
