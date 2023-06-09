import { createTRPCRouter, publicProcedure } from "$/server/api/trpc";
import { type QuestionSchema, questionSchema } from "./schema";
import { TRPCError } from "@trpc/server";

const POSTS: QuestionSchema[] = [
  {
    id: "1",
    question: "Create a new task",
    description:
      "Create a new task and return it to the server and return it to the user",
    category: "Desing UX and UI",
    dueDate: "2023-06-02",
    status: "Completed",
    answers: [
      {
        id: "1",
        answer:
          "The pursuit of happiness and fulfillment in whatever way one chooses.",
      },
      {
        id: "2",
        answer:
          "The meaning of life is to find inner peace and contentment through mindfulness and self-reflection.",
      },
    ],
  },
];

export const questionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return POSTS;
  }),
  getOne: publicProcedure
    .input(questionSchema.pick({ id: true }))
    .query(({ input }) => {
      return POSTS.find((post) => post.id === input.id) ?? null;
    }),
  create: publicProcedure
    .input(
      questionSchema.pick({
        question: true,
        description: true,
        dueDate: true,
        category: true,
        status: true,
      }),
    )
    .mutation(({ input }) => {
      const post: QuestionSchema = {
        ...input,
        id: Math.random().toString(),
        answers: [],
        description: input.description,
        dueDate: input.dueDate,
        category: input.category,
        status: input.status,
      };
      POSTS.push(post);
      return post;
    }),

  update: publicProcedure
    .input(
      questionSchema.pick({
        id: true,
        question: true,
        description: true,
        dueDate: true,
        category: true,
        status: true,
      }),
    )
    .mutation(({ input }) => {
      const post = POSTS.find((post) => post.id === input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }
      post.question = input.question;
      return post;
    }),

  delete: publicProcedure
    .input(questionSchema.pick({ id: true }))
    .mutation(({ input }) => {
      const index = POSTS.findIndex((post) => post.id === input.id);
      if (index === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }
      POSTS.splice(index, 1);
      return { id: input.id };
    }),
});
