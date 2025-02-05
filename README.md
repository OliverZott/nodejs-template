# Readme

A simple Node.js Express TypeScript project including project-setup and deployment steps.

## Project Setup

```bash
mkdir <proj-name>
npm init -y
npm install typescript ts-node-dev @types/node @types/express --save-dev
npm install express
npx tsc --init
git init
```

- add simple express rest endpoint
- run `npm start`

## Production Setup

### Prerequisites

- Node.js: Ensure Node.js is installed on the production server.
- TypeScript: Ensure TypeScript is installed as a development dependency.
- Build Script: Ensure you have a build script in your package.json.

### Steps

1. Build the project:

    ```bash
    npm run build
    ```

2. Copy the `dist` folder and `package.json` to the production server.

3. On the production server, install only the production dependencies:

    ```bash
    npm install --production
    ```

4. Start the server:

    ```bash
    npm run start:prod
    ```

[link](https://medium.com/@eran.amrani/how-to-deploy-a-ts-node-js-app-in-minutes-e3ab17ab0673)
