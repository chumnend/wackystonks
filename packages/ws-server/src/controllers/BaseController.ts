import { Request, Response } from 'express';

abstract class BaseController {
  public abstract create(req: Request, res: Response): void;
  public abstract read(req: Request, res: Response): void;
  public abstract update(req: Request, res: Response): void;
  public abstract delete(req: Request, res: Response): void;
}

export default BaseController;
