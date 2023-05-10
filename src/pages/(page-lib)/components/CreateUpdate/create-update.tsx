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
    Pick<
      QuestionSchema,
      "question" | "description" | "category" | "dueDate" | "status"
    >
  >({
    defaultValues: {
      question: "",
      description: "",
      category: "",
      dueDate: "",
      status: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(
      questionSchema.pick({
        question: true,
        description: true,
        category: true,
        dueDate: true,
        status: true,
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
      status: question.status,
    });

    setEditingQuestion(question);
  };

  return (
    <>
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
                <span className="font-semibold text-green-500">Category: </span>{" "}
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
    </>
  );
};

export default Home;
