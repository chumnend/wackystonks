import { Router } from 'express';
import SampleRouter from './sample.routes';

class MainRouter {
  private _router = Router();

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/', SampleRouter);
  }
}

export = new MainRouter().router;
