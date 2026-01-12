import express from 'express';

import router from './routes/router.js';
import { logger } from './utils/logger.js';

const app = express();
const port = 3000;

app.use("/api", router)

//Fallback for wrong routes
app.use((req, res, next) => {
    res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


logger.info("Express app initialized");