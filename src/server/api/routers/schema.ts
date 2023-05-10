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
  /*category: z.union([   
    z.literal("Software development"),
    z.literal("Desing ux and ui"),
    z.literal("Project manager"),
    z.literal("Scrum master"),
    z.literal("business analyst"),
  ]),
  */
  dueDate: z.string().refine((v) => new Date(v).getTime() > Date.now(), {
    message: "¡oops!, must set an expiration date",
  }),
  status: z.string().trim().min(5, "Must selection a status"),
  answers: z.array(answerSchema),
});

const createQuestionInput = questionSchema.pick({
  id: true,
  question: true,
  description: true,
  category: true,
  dueDate: true,
});

//export type CreateQuestionInput = z.infer<typeof createQuestionInput>;
export type AnswerSchema = z.infer<typeof answerSchema>;
export type QuestionSchema = z.infer<typeof questionSchema>;
