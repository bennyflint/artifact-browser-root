import { ApiError, ApiRequest, ApiResponse, InternalApiRequest, SimpleApiRequest } from './interfaces';
import { CliApiRequest } from './CliApiRequest';
import fetch from 'cross-fetch';

export class ApiService {
  GENERAL_ERROR = 'GENERAL_ERROR';
  JSON_PARSE_ERROR = 'JSON_PARSE_ERROR';
  UNABLE_TO_FULFILL_REQUEST = 'UNABLE_TO_FULFILL_REQUEST';

  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async cliRequest<ResponseType>(...args: string[]): Promise<ApiResponse<ResponseType, never>> {
    const request: ApiRequest = new CliApiRequest(args);
    return this.sendRequestInternal<ResponseType>(request);
  }

  // TODO I would like to unify the way that cli and remote requests are handled.
  private async sendRequestInternal<ResponseType>(
    request: ApiRequest,
  ): Promise<ApiResponse<ResponseType, never>> {
    return new Promise(resolve => {
      fetch(this.baseUrl + request.path, request.requestInit())
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            const apiError: ApiError<never> = {
              errorCode: this.UNABLE_TO_FULFILL_REQUEST,
              errorMessage: res.statusText,
              statusCode: res.status,
            };
            resolve({ success: false, error: apiError });
            return undefined;
          }
        })
        .then(json => {
          const parsedObject = JSON.parse(json.response) as ResponseType;
          resolve({ success: true, error: json.error, response: parsedObject });
        })
        .catch(error => {
          const apiError: ApiError<never> = { errorCode: this.GENERAL_ERROR, errorMessage: error };
          // See note above for why error = false.
          resolve({ success: false, error: apiError });
        });
    });
  }

  async apiRequest<BodyType, ResponseType, ErrorType>(
    apiRequest: SimpleApiRequest<BodyType, ErrorType>
  ): Promise<ApiResponse<ResponseType, ErrorType>> {
    return this.sendRemoteRequest<BodyType, ResponseType, ErrorType>(apiRequest);
  }

  async remoteRequest<BodyType, ResponseType, ErrorType>(
    apiRequest: InternalApiRequest<BodyType, ErrorType>,
  ): Promise<ApiResponse<ResponseType, ErrorType>> {
    return this.sendRemoteRequest<BodyType, ResponseType, ErrorType>(apiRequest);
  }

  private async sendRemoteRequest<BodyType, ResponseType, ErrorType>(
    request: SimpleApiRequest<BodyType, ErrorType>,
  ): Promise<ApiResponse<ResponseType, ErrorType>> {
    return new Promise(resolve => {
      fetch(this.baseUrl + request.path, request.requestInit())
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            const apiError: ApiError<never> = {
              errorCode: this.UNABLE_TO_FULFILL_REQUEST,
              errorMessage: res.statusText,
              statusCode: res.status,
            };
            resolve({ success: false, error: apiError });
            return undefined;
          }
        })
        .then(json => {
          if (!request.errorHandler || !request.errorHandler.isError(json.response)) {
            const responseObj = json.response as ResponseType;
            resolve({ success: true, response: responseObj });
          } else {
            const responseObj = request.errorHandler.toApiError(json.response);
            resolve({ success: false, error: responseObj });
          }
        })
        .catch(error => {
          // There is no error json to wrap in the ApiError we're returning, so we don't have an ErrorType; use never instead.
          let apiError: ApiError<never>;
          if (error instanceof SyntaxError) {
            apiError = {
              errorCode: this.JSON_PARSE_ERROR,
              errorMessage: 'Unable to parse response from remote server as json',
              errorDetail:
                error.message +
                '\nIt is possible that: ' +
                '1) The remote service did not return valid json, ' +
                '2) You are trying to parse the wrong response type, ' +
                '3) You are trying to parse an error but have not included an ErrorHandler with your InternalApiRequest object. ' +
                'Talk to an engineer.',
            };
          } else {
            apiError = {
              errorCode: this.GENERAL_ERROR,
              errorMessage: `${error.name}: ${error.message}`,
              errorStackTrace: error.stack,
            };
          }
          resolve({ success: false, error: apiError });
        });
    });
  }
}
