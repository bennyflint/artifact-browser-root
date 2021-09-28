import { Router } from 'express';
import { RemoteInterop } from 'interfaces/remote.interface';
import RemoteController from '../controllers/remote.controller';
import Route from '../interfaces/route.interface';

class RemoteRoute implements Route {
  public path = '/api/remote';
  public router = Router();

  private controller: RemoteController;

  constructor(interop: RemoteInterop) {
    this.controller = new RemoteController(interop);
    this.initializeRelativeRoutes();
  }

  private initializeRelativeRoutes() {
    this.router.post('/', this.controller.exec);
  }
}

export default RemoteRoute;
