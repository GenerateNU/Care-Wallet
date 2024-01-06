<h1 align="center">Care Wallet</h1>
  <div align="center">
      A fullstack application for the Care-Wallet project
  </div>
<br />
<div align="center">
  <!-- Github Actions -->
  <a href="https://github.com/MattCMcCoy/TestRepoCW/actions/workflows/test.yml">
    <img src="https://github.com/MattCMcCoy/TestRepoCW/actions/workflows/test.yml/badge.svg"
      alt="Workflow Status" />
  </a>
  <br/>

  [Change Log](CHANGELOG.md)
</div>

## Set Up Your Development Environment
First, understand the tech stack:

- The database is [PostGreSQL](https://www.postgresql.org/) and will be containerized using [Docker](https://www.docker.com/).
- The backend is [Golang](https://go.dev/)
- The frontend is [ReactNative](https://reactnative.dev/) with [TypeScript](https://www.typescriptlang.org/) and [NativeWind](https://www.nativewind.dev) and uses [Expo](https://expo.dev/) as a build tool and [React Navigation](https://reactnavigation.org/)

Before compiling and running our application, we need to install several languages, package managers, and various tools.
The installation process can vary, so follow the instructions for each item below!

- [Go](https://go.dev/doc/install), our primary backend language
  - Afterwards, install all go dependencies with the command `go get .` in the root directory. This needs to be re-run if dependencies change
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - our package manager in the frontend
  - Afterwards, install all dependencies in the frontend with `npm install --prefix client` in the root directory.

If everything was successful, you can now compile and run the project!

## Running the project

> TODO
