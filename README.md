<div align="center">
<h1>Care-Wallet</h1>
  <div>
      A fullstack application for the Care-Wallet project
  </div>
  <br/>
  <!-- Github Actions -->
  <a href="https://github.com/GenerateNU/Care-Wallet/actions/workflows/CI.yml">
    <img src="https://github.com/GenerateNU/Care-Wallet/actions/workflows/CI.yml/badge.svg"
      alt="Workflow Status" />
  </a>
  <br/>
</div>

## Set Up Your Development Environment

First, understand the tech stack:

- The database is [PostGreSQL](https://www.postgresql.org/) and will be
  containerized using [Docker](https://www.docker.com/).
- The backend is [Golang](https://go.dev/)
- The frontend is [TypeScript](https://www.typescriptlang.org/) with
  [ReactNative](https://reactnative.dev/) and
  [NativeWind](https://www.nativewind.dev) and uses [Expo](https://expo.dev/) as
  a build tool

Before compiling and running our application, we need to install/setup several
languages, package managers, and various tools. The installation process can
vary, so follow the instructions for each item below!

- [Go](https://go.dev/doc/install) - our primary backend language
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - our
  package manager in the frontend
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - useful for
  running docker
- [ngrok](https://ngrok.com/docs/getting-started/) - Allows us to easily connect
  the frontend to backend code
- [expo-go](https://docs.expo.dev/get-started/expo-go/) - Expo allows mobile
  devices to scan a QR code and view the code running on a mobile device

If you wish to simulate a phone from your computer either below will work:

- [xcode](https://docs.expo.dev/workflow/ios-simulator/) - A simulator to view
  the code on an iphone from a laptop
- [android studio](https://docs.expo.dev/workflow/android-studio-emulator/) - An
  emulator to view the code on an android device from a laptop

If everything was successful, you can now compile and run the project!

Next, understand the development tools that will make our lives easier:

- [Pre-commit](https://pre-commit.com) - standardizing code style and commits
- [Swagger](https://github.com/swaggo/swag) - visualizing the api and return
  types of requests from the database
- [Task](https://taskfile.dev) - speeding up development by running long
  commands in quick phrases

Before committing anything, we need to install several tools. The installation
process can vary, so follow the instructions for each item below!

- [pre-commit](https://pre-commit.com) - our development tool to standardize
  development and ensure every file follows the same styling guidelines.
- [Task](https://taskfile.dev/installation/) - our development tool to quickly
  run commands that run, test, and clean files.

## Running the project

1. Launch Docker Desktop
2. In the base of the repo: run `task start-docker`

- This will run `docker-compose down` then `docker-compose up`

3. To build all of the dependencies of the project: run `task build`

- This will install both frontend and backend dependencies

4. Then, open a new tab to run commands in: run `task start-backend`

- This will generate the swagger docs as well as start the backend
- You can now view swagger: http://localhost:8080/swagger/index.html

5. Next, open one last tab to run commands in: run `task start-ngrok`

- This will just give you a prompt to enter your ngrok domain for example mine
  is:

  `kind-dane-roughly.ngrok-free.app`

6. Next, open another new tab to run commands in: run `task start-frontend`

- This will start the frontend

7. From here follow the prompt in step 6 to launch the frontend on your device
   of choice
