/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse, InternalApiRequest, RemoteApiRequest, ApiError, ErrorHandler } from '@bflint/tools-api';
import { RemoteInterop, RemoteRequest } from 'interfaces/remote.interface';
import Route from 'interfaces/route.interface';
import * as request from 'supertest';
import App from '../app';
import RemoteRoute from '../routes/remote.route';
import { Headers } from 'cross-fetch';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Remote API call', () => {
  let interopMock: RemoteInterop;
  let route: Route;
  let app: App;

  const success = { success: true, response: { data: 'somedata' } };

  // Useful for setting up custom responses before we create the route.
  function doBeforeAll(customSetup: () => void): void {
    customSetup();
    route = new RemoteRoute(interopMock);
    app = new App([route]);
  }

  function mockResponse<ResponseType, ErrorType>(response: ApiResponse<ResponseType, ErrorType>): void {
    const mockExecute = function(request: RemoteRequest<unknown>): Promise<ApiResponse<ResponseType, ErrorType>> {
      return new Promise(resolve => {
        resolve(response);
      });
    };
    interopMock = { execute: jest.fn(mockExecute) } as RemoteInterop;
  }

  describe('call = /remote with successful response', () => {
    beforeAll(() => {
      doBeforeAll(() => {
        mockResponse(success);
      });
    });

    it('response statusCode 200', () => {
      const req: InternalApiRequest<Record<string, never>, string> = new RemoteApiRequest({
        remoteUri: '/some/remoteendpoint',
        remoteMethod: 'GET',
        remoteHeaders: new Headers(),
        errorHandler: undefined,
      });

      return request(app.getServer())
        .post(`${route.path}`)
        .send(req)
        .expect(200)
        .expect(success);
    });
  });

  describe('call = /remote with unsuccessful response from upstream server', () => {
    class AlwaysError implements ErrorHandler<string> {
      isError(response: unknown): boolean {
        return true;
      }
      toApiError(response: string): ApiError<string> {
        return {
          errorCode: response,
          errorMessage: response,
          error: response,
        };
      }
    }

    const remoteResponse = 'Sorry, Charlie';
    beforeAll(() => {
      doBeforeAll(() => {
        mockResponse({ success: false, response: remoteResponse });
      });
    });

    it('response statusCode 502', () => {
      const req: InternalApiRequest<Record<string, never>, string> = new RemoteApiRequest({
        remoteUri: '/some/remoteendpoint',
        remoteMethod: 'POST',
        remoteHeaders: new Headers(),
        errorHandler: undefined,
      });

      return request(app.getServer())
        .post(`${route.path}`)
        .send(req)
        .expect(502)
        .expect({ success: false, response: remoteResponse });
    });
  });
});
