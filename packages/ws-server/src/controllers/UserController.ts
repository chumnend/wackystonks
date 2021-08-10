import { Response, Request } from 'express';
import BaseController from './BaseController';

class UserController extends BaseController {
  public create(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public read(req: Request, res: Response): void {
    res.json({ message: 'GET /user request received' });
  }

  public update(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }

  public delete(req: Request, res: Response): void {
    throw new Error('Method not implemented.');
  }
}

export default UserController;
