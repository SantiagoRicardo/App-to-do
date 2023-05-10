# App To - Do

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Project description

The "To-do" application is a tool that allows users to create and manage a list of tasks to be done. With this application, users can add tasks, assign a due date, and mark their status. Additionally, it allows users to edit and delete existing tasks.

## What's next? How do I make an app with this?

I tryed to keep this project as simple as possible.

## Repository structure

Folders

`pages`: in this folder every component created is pre-rendered on the next js server to show the rendering to the client and not the whole component, for fast execution.

`utils`: Contain `api.ts` is the client-side entry point for a tRPC (Transport Protocol for React Query) API. tRPC is a set of tools that allows you to create type-safe APIs on the client side and on the server side.

`server`: contains an

- `api` folder with a subfolder in `api` called `routers` in this folder I have created a file to create the `Create`, `Delete` and `Update` functionalities, using `tRPC`, plus a file called `schemas.ts` which is where the body of the task is located.

-Files: `root.ts` and `trpc.ts` for trpc configuration.

File main
`index.page.tsx`: main file containing the structure of the web page.

## Technologies Used

- [Next.js](https://nextjs.org): A React-based web framework for building server-side rendered (SSR) applications.
- [Tailwind CSS](https://tailwindcss.com):A utility-first CSS framework that provides a set of pre-defined styles and classes to quickly build responsive user interfaces.
- [tRPC](https://trpc.io): A framework for building type-safe, high-performance APIs over HTTP or WebSockets.
- [zod](https://zod.dev/): A schema validation library for TypeScript, used for validating data in the "To-do" application.
- [React Hooks Form](https://react-hook-form.com/): React Hooks Form is a library that provides a simple and declarative way to manage form state in React.

## Installation

In order to run this application, you will need to have Node.js and npm installed on your system.

- [Node JS](https://nodejs.org/es): Download Node JS from this link.

Once inside the App-to-do project folder, in your terminal run this command to install the Node js dependencies with npm

```

//either of these two can use
    npm install
    npm i

```

After installing the required dependencies, run the following command in your terminal to run the project from the root folder:

```
    npm run dev

```

This will start the server at http://localhost:3000 and you will be able to access the application from your web browser.

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
