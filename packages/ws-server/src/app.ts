import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

import MasterRouter from './router/MasterRouter';
import ErrorHandler from './models/ErrorHandler';

dotenv.config();

/**
 * Express server application class
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// create Server instance
const server = new Server();

// append router to /api route
server.app.use('/api', server.router);

// handle errors
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
});

((port = process.env.PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();
