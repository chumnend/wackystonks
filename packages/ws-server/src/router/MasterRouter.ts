import { Router } from 'express';
import ARouter from './A';
import BRouter from './B';

class MasterRouter {
  private _router = Router();
  private _subrouterA = ARouter;
  private _subrouterB = BRouter;

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
    this._router.use('/A', this._subrouterA);
    this._router.use('/B', this._subrouterB);
  }
}

export = new MasterRouter().router;