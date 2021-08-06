import { NextFunction, Request, Response, Router } from 'express';
import AController from '../../controllers/A';

class ARouter {
  private _router = Router();
  private _controller = AController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.default());
    });
  }
}

export = new ARouter().router;
