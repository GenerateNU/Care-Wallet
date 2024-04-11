<div align="center">
<h1>Care-Wallet</h1>
  <a href="https://github.com/GenerateNU/Care-Wallet/actions/workflows/BackendCI.yml">
    <img src="https://github.com/GenerateNU/Care-Wallet/actions/workflows/BackendCI.yml/badge.svg"
      alt="Workflow Status" />
  </a>
    <a href="https://github.com/GenerateNU/Care-Wallet/actions/workflows/FrontendCI.yml">
    <img src="https://github.com/GenerateNU/Care-Wallet/actions/workflows/FrontendCI.yml/badge.svg"
      alt="Workflow Status" />
  </a>
  <br/>
  <br/>
  <div>
      A fullstack application for the Care-Wallet project
  </div>
</div>

## Stack

[![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/doc/)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactnative.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Tools

[![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)](https://docs.expo.dev/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)

## Development Enviroment Setup

Before compiling and running our application, we need to install/setup several
languages, package managers, and various tools. The installation process can
vary, so follow the instructions for each item below!

[Go](https://go.dev/doc/install) our primary backend language.

[Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
our package manager in the frontend.

[Docker](https://www.docker.com/get-started/) and
[Docker Desktop](https://www.docker.com/products/docker-desktop/) our Postgres
Database will be containerized in Docker.

[Ngrok](https://ngrok.com/docs/getting-started/) Allows us to easily connect the
frontend to backend code.

[Swagger](https://github.com/swaggo/swag) visualizing the api and return types
of requests from the database.

[Task](https://taskfile.dev) speeding up development by running long commands in
quick phrases.

[Nodemon](https://www.npmjs.com/package/nodemon) a tool that watches code and
reloads the build if it sees changes.

## Before Running

Create an .env file in the root directory:

```
  EXPO_PUBLIC_API_DOMAIN=your-ngrok-static-domain-here
  AWS_ACCESS_KEY=your-aws-access-key-here
  AWS_SECRET_KEY=your-aws-secret-key-here
```

## Before Contributing

Before contributing to the project, we need to install/setup several various
tools. The installation process can vary, so follow the instructions for each
item below!

[Pre-commit](https://pre-commit.com) standardizing code style and commits

[Commitizen](https://commitizen-tools.github.io/commitizen/) organizing our
commits into categories

## Running The Project

1. Launch Docker Desktop
2. In the base of the repo: run `task start-docker`
3. Then, open a new tab to run commands in: run `task start-backend` or
   `task start-dev`
   - You can now view swagger: http://localhost:8080/swagger/index.html
4. Next, in a new tab run `task start-ngrok`
5. Finally, open one last new tab: run `task start-frontend`
