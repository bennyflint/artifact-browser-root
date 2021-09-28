import { NextFunction, Request, Response } from 'express';
import { ApiError, ApiRequest, ApiResponse } from '@bflint/tools-api';
import CliInterop from 'interfaces/cli.interface';
import { ExecException } from 'child_process';

class CliController {
  private cli: CliInterop;

  constructor(cliInterop: CliInterop) {
    this.cli = cliInterop;
  }

  public exec = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const request: ApiRequest = req.body;
      if (request.args && request.args.length > 0) {
        try {
          const result = await this.cli.executeCommand(request.args.join(' '));
          const response: ApiResponse<unknown, never> = { success: true, response: result || {} };
          res.send(response);
        } catch (error) {
          const execException = error as ExecException;
          const apiError: ApiError<never> = {
            statusCode: execException.code,
            errorCode: 'GENERAL_CLI_ERROR',
            errorMessage: execException.message,
          };
          const response: ApiResponse<unknown, never> = { success: false, error: apiError };
          res.status(502).send(response);
        }
      } else {
        const apiError: ApiError<never> = {
          statusCode: 400,
          errorCode: 'INVALID_CLI_REQUEST',
          errorMessage: 'Request is invalid',
        };
        const response: ApiResponse<unknown, never> = { success: false, error: apiError };
        res.status(400).send(response);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export default CliController;
