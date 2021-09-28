export interface ApiRequest {
  args: string[];
  requestInit(): RequestInit;
}

export interface InternalApiRequest<BodyType, ErrorType> {
  remoteUri: string;
  remoteMethod: string;
  remoteHeaders: Record<string, string>;
  body?: BodyType | undefined;
  errorHandler?: ErrorHandler<ErrorType>;
  requestInit(): RequestInit;
}

export interface ApiResponse<ResponseType, ErrorType> {
  success: boolean;
  error?: ApiError<ErrorType>;
  response?: ResponseType;
}

// ErrorType is the type of error returned by an upstream service, if it returns one. For instance, a game
// server might return a 400 whose response body is a json error object.
export interface ApiError<ErrorType> {
  // A numeric status code, usually populated be HTTP status code
  statusCode?: number;
  // A machine-usable string identifier
  errorCode: string;
  // Brief one line error summary
  errorMessage: string;
  // A detailed error message that contains info about what was affected and how it might be fixed
  errorDetail?: string;
  errorStackTrace?: string;
  // the error? prop is the actual error error returned from an upstream service.
  error?: ErrorType | undefined;
}

// An ErrorHandler is needed when a remote server sends back custom error messages.
export interface ErrorHandler<ErrorType> {
  isError(response: unknown): boolean;
  toApiError(response: unknown): ApiError<ErrorType>;
}
