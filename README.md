# Readme

A simple Node.js Express TypeScript project including project-setup and deployment steps.

TODO:

- Global error handling middleware
- Environment variable management (dotenv)

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

### PM2 deployment

On production server:

- `/var/www/aw-backend`
- `git pull` (if changes in code)
- `npm run build:prod` - Install deps, build, and cleanup for production
- `pm2 start ecosystem.config.js --env production` - Start with PM2 (production mode)
- `pm2 save` - Save PM2 configuration
- `pm2 startup` - Setup auto-start on boot
- Check status
  - `pm2 list`
  - `pm2 describe aw-backend`
  - `pm2 logs aw-backend`

If new app version:

- Pull and build first
  - `git pull origin main`
  - `npm run build:prod`
- `pm2 reload aw-backend` Reload
- `pm2 logs aw-backend --lines 20` Verify

### PM2 common commands

```bash
# Start/Stop/Restart
pm2 start ecosystem.config.js --env production # Start with production config
pm2 stop aw-backend                            # Stop the app
pm2 restart aw-backend                         # Restart the app
pm2 delete aw-backend                          # Stop and remove from PM2 list

# Monitoring
pm2 list                                      # List all processes
pm2 describe aw-backend                       # Detailed info about the app
pm2 logs aw-backend                           # View logs (real-time)
pm2 logs aw-backend --lines 50                # View last 50 log lines
pm2 monit                                     # Real-time monitoring dashboard

# Management
pm2 save                                      # Save current process list
pm2 startup                                   # Generate startup script
pm2 resurrect                                 # Restore saved processes
pm2 reload aw-backend                         # Zero-downtime restart
pm2 flush                                     # Clear all logs

# Stop all processes
pm2 stop all                                  # Stop all apps
pm2 delete all                                # Delete all apps
```

## Docker

Use docker compose:

- `docker compose up --build`  ...always uses dockerized postgres database!
- `docker compose down`

Use docker commands:

- `docker build -t aw-backend .` ...build the Docker image
- `docker run -p 3000:3000 --name aw-backend aw-backend` ...run the Docker container first time
- `docker start aw-backend` / `docker stop aw-backend` ...Start / Stop container
- `docker container rm aw-backend` ...Remove container

### postgres - docker container

for host access:

- cli `psql -h localhost -p 5433 -U postgres -d abfall`
- pgadmin / datagrip:
  - host: localhost
  - port: 5433

for container to container access:

- host: aw-database
- port: 5432

## Linting

[ts-eslint docs](https://typescript-eslint.io/users/configs/)

- Manual setup:
  - `npm install --save-dev eslint @eslint/js typescript typescript-eslint`
  - create `eslint.config.mjs`
- Interactive setup `npm init @eslint/config@latest`
- If necessary install jiti... `npm install --save-dev jiti`

Run linter:

- `npx eslint .`
- or `npm run lint`
