import { NextFunction, Request, Response, Router } from 'express';
import SampleController from '../controllers/sample.controller';

class SampleRouter {
  private _router = Router();
  private _controller = SampleController;

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
      try {
        const result = this._controller.default();
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
  }
}

export = new SampleRouter().router;
