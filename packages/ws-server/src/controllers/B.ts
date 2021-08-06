import ErrorHandler from '../models/ErrorHandler';

class BController {
  default() {
    throw new ErrorHandler(501, 'Not implemented method');
  }
}

export = new BController();
