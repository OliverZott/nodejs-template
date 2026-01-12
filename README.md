# Readme

A simple Node.js Express TypeScript project including project-setup and deployment steps.

## Run and Debug

- `npm run dev` - Run the project in development mode with automatic restarts on file changes. Should also attach debugger on start.

## Project Setup

```bash
mkdir <proj-name>
npm init -y
npx tsc --init
git init

npm install typescript ts-node-dev @types/node @types/express --save-dev
npm install express
```

## Production Setup

### Prerequisites

- Node.js: Ensure Node.js is installed on the production server.
- TypeScript: Ensure TypeScript is installed as a development dependency.
- Build Script: Ensure you have a build script in your package.json.

### Steps

- Clone the Repository: Clone your project repository to the production server.
- Install Dependencies: Run npm install to install all necessary dependencies.
- Build the Project: Run npm run build to compile TypeScript files to JavaScript.
