import fetch from 'cross-fetch';
import { RemoteInterop, RemoteRequest } from 'interfaces/remote.interface';
import { ApiError, ApiResponse } from '@bflint/tools-api';

class RemoteServerInterop implements RemoteInterop {
  remoteHost: string;

  constructor(remoteHost: string) {
    this.remoteHost = remoteHost;
  }

  public async execute<BodyType, ResponseType, ErrorType>(
    request: RemoteRequest<BodyType>,
  ): Promise<ApiResponse<ResponseType, ErrorType>> {
    return new Promise(resolve => {
      fetch(this.remoteHost + request.uri, request.requestInit())
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            const apiError: ApiError<never> = {
              statusCode: res.status,
              errorCode: 'UPSTREAM_ERROR',
              errorMessage: res.statusText,
            };
            resolve({ success: false, error: apiError });
          }
        })
        .then(json => {
          resolve({ success: true, response: json });
        })
        .catch(error => {
          const apiError: ApiError<never> = { statusCode: 500, errorCode: 'INTERNAL_ERROR', errorMessage: error };
          resolve({ success: false, error: apiError });
        });
    });
  }
}

export default RemoteServerInterop;
