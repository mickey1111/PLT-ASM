import express from 'express';
import v1Router from "./v1";

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use('/api', v1Router);

export default apiRouter;