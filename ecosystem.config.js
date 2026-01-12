/**
 * PM2 ecosystem configuration file
 * @type {import('pm2').StartOptions}
 */
export const apps = [
  {
    name: "node-api",
    script: "dist/app.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
    },
  },
];
