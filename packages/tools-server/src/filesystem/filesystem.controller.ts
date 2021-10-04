import { NextFunction, Request, Response } from 'express';
import { ApiError, ApiResponse, FileSystemRequestBody, InternalApiRequest, SimpleApiRequest } from '@bflint/tools-api';
import { RemoteInterop } from 'interfaces/remote.interface';
import { RemoteServerRequest } from '../remote/remote-server-request';
import FileSystemInterop from './filesystem.interface';

export class FileSystemController {
  private interop: FileSystemInterop;

  constructor(interop: FileSystemInterop) {
    this.interop = interop;
  }

  send = async (req: SimpleApiRequest<FileSystemRequestBody, unknown>, res: Response): Promise<void> => {
    try {
      this.interop
        .execute(req.body)
        .then(remoteResponse => {
          if (remoteResponse.success === false) {
            res.status(502).send(remoteResponse);
          } else {
            // Note: remoteResponse.response may actually be an error response returned as a 200. That's ok.
            // We'll pass it along as a success. The error can be identified by an ErrorHandler in the api layer on the client side.
            // We don't want the backend to be in the business of identifying errors based on response bodies.
            res.send({ success: true, response: remoteResponse.response || {} });
          }
        })
        .catch(error => {
          res.status(502).send({ success: false, response: error });
        });
    } catch (error) {
      res.status(502).send({ success: false, response: error });
    }
  };

  public exec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: SimpleApiRequest<FileSystemRequestBody, unknown> = req.body;
      if (this.isRequestValid(request)) {
        this.send(request, res);
      } else {
        const apiError: ApiError<never> = {
          statusCode: 400,
          errorCode: 'INVALID_REMOTE_REQUEST',
          errorMessage: 'Request is invalid',
        };
        const response: ApiResponse<unknown, unknown> = { success: false, error: apiError, response: apiError };
        res.status(400).send(response);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  private isRequestValid(request: SimpleApiRequest<unknown, unknown>): boolean {
    // TODO This will be a very stupid validation because we don't (and should not) know
    // much about the requests we are proxying. We may be able to get rid of it.
    if (request) {
      return true;
    }
    return false;
  }
}
