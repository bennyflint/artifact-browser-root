import { Router } from 'express';
import CliInterop from 'interfaces/cli.interface';
import CliController from 'controllers/cli.controller';
import Route from 'interfaces/route.interface';
import FileSystemInterop from './filesystem.interface';
import { FileSystemController } from './filesystem.controller';

export class FileSystemRoute implements Route {
  public path = '/api/filesystem';
  public router = Router();

  private controller: FileSystemController;

  constructor(interop: FileSystemInterop) {
    this.controller = new FileSystemController(interop);
    this.initializeRelativeRoutes();
  }

  private initializeRelativeRoutes() {
    this.router.post('/', this.controller.exec);
  }
}

