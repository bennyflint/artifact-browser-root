import { ErrorHandler, InternalApiRequest } from './interfaces';

/* This class represents a call to our Node back end. The data is used by the back end to
   make either a CLI call or an http call to a remote server. */
export class RemoteApiRequest<BodyType, ErrorType> implements InternalApiRequest<BodyType, ErrorType> {
  remoteUri: string;
  remoteMethod: string;
  remoteHeaders: Record<string, string>;
  body?: BodyType | undefined;
  errorHandler?: ErrorHandler<ErrorType>;

  constructor({
    remoteUri,
    remoteMethod,
    remoteHeaders,
    body,
    errorHandler,
  }: {
    remoteUri: string;
    remoteMethod: string;
    remoteHeaders: Record<string, string>;
    body?: BodyType;
    errorHandler?: ErrorHandler<ErrorType>;
  }) {
    this.remoteUri = remoteUri;
    this.remoteMethod = remoteMethod;
    this.remoteHeaders = remoteHeaders;
    this.body = body;
    this.errorHandler = errorHandler;
  }

  requestInit(): RequestInit {
    return {
      method: 'POST',
      body: JSON.stringify(this),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
