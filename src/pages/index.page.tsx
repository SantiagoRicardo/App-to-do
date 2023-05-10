import { type NextPage } from "next";
import Head from "next/head";
import { api } from "$/utils/api";
import { useForm } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  questionSchema,
  type QuestionSchema,
} from "$/server/api/routers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const getAllQuery = api.questions.getAll.useQuery();
  const utils = api.useContext();
  const createMutation = api.questions.create.useMutation({
    onSuccess: (res) => {
      if (res == null) return;

      const data = utils.questions.getAll.getData() ?? [];
      utils.questions.getAll.setData(undefined, [...data, res]);
    },
  });

  const form = useForm<
    Pick<QuestionSchema, "question" | "description" | "category" | "dueDate">
  >({
    defaultValues: {
      question: "",
      description: "",
      category: "",
      dueDate: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(
      questionSchema.pick({
        question: true,
        description: true,
        category: true,
        dueDate: true,
      }),
    ),
  });

  const deleteQuestion = api.questions.delete.useMutation({
    onSuccess: (res) => {
      void utils.questions.getOne.invalidate({
        id: res.id,
      });
      void utils.questions.getAll.invalidate();
    },
  });

  const [editingQuestion, setEditingQuestion] = useState<QuestionSchema>();

  const handleEdit = (question: QuestionSchema) => {
    form.reset({
      question: question.question,
      description: question.description,
      category: question.category,
      dueDate: question.dueDate,
    });

    setEditingQuestion(question);
  };

  return (
    <>
      <Head>
        <title>App To-do</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center gap-8 bg-neutral-800 p-12">
        <div>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit((data) => {
              void createMutation.mutate(data);
              form.reset();
            })}
            className="gap-2"
          >
            <h1 className="mx-auto text-center text-5xl font-extrabold text-red-500 md:w-2/3">
              Aplication <span className="text-blue-700">TODO</span>
            </h1>
            <label className="flex w-full flex-col gap-2 text-neutral-100">
              Add a task
              <input
                type="text"
                className="rounded-md bg-neutral-700 p-2 text-neutral-100 placeholder-neutral-500"
                placeholder="Write a title..."
                {...form.register("question")}
              />
              {form.formState.errors.question && (
                <span className="font-medium text-red-500">
                  {form.formState.errors.question.message}
                </span>
              )}
            </label>

            <label className="flex w-full flex-col gap-2 text-neutral-100">
              Add a description
              <input
                type="text"
                className="rounded-md bg-neutral-700 p-2 text-neutral-100 placeholder-neutral-500"
                placeholder="Establish a date..."
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <span className="font-medium text-red-500">
                  {form.formState.errors.description.message}
                </span>
              )}
            </label>

            <label className="flex w-full flex-col gap-2 text-neutral-100">
              Add a date
              <input
                type="date"
                className="rounded-md bg-neutral-700 p-2 text-neutral-100 placeholder-neutral-500"
                placeholder="dd/mm/yyyy"
                {...form.register("dueDate")}
              />
              {form.formState.errors.dueDate && (
                <span className="font-medium text-red-500">
                  {form.formState.errors.dueDate.message}
                </span>
              )}
            </label>

            <label className="flex w-full flex-col gap-2 text-neutral-100">
              Add a category
              <select
                {...form.register("category")}
                className="rounded-md bg-neutral-700 p-2 text-neutral-100 placeholder-neutral-500"
              >
                <option selected>Category...</option>
                <option value="Desing UX and UI">Desing UX and UI</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Project Manager">Project Manager</option>
              </select>
              {form.formState.errors.category && (
                <span className="font-medium text-red-500">
                  {form.formState.errors.category.message}
                </span>
              )}
            </label>
            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-blue-600 p-2 font-bold text-neutral-100"
            >
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-2">
          {getAllQuery.data?.map((question) => (
            <div
              key={question.id}
              className="items-center gap-2 rounded bg-neutral-700 px-6 py-2 text-neutral-100"
            >
              <div>
                <h1>
                  <span className="font-semibold text-green-500">Task:</span>{" "}
                  {question.question}
                </h1>
                <p>
                  <span className="font-semibold text-green-500">
                    Description:{" "}
                  </span>{" "}
                  {question.description}
                </p>
                <p>
                  <span className="font-semibold text-green-500">
                    Category:{" "}
                  </span>{" "}
                  {question.category}
                </p>
                <p>
                  <span className="font-semibold text-green-500">Date: </span>{" "}
                  {question.dueDate}
                </p>
              </div>
              <div className="mt-10 justify-between md:flex">
                <button
                  className="rounded-md bg-green-600 px-10 py-2 font-bold text-white hover:bg-green-700"
                  onClick={() => {
                    handleEdit(question);
                  }}
                >
                  Update
                </button>
                <select className="mt-3 rounded-md bg-slate-900 p-2 text-neutral-100 placeholder-neutral-500">
                  <option selected>Status</option>
                  <option value="desing">Ongoing</option>
                  <option value="desing">Pending</option>
                  <option value="develop">Completed</option>
                </select>
                <button
                  type="button"
                  className="mt-3 flex rounded bg-red-500 p-2"
                  onClick={() => {
                    void deleteQuestion.mutate(question);
                  }}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
