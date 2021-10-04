import { RemoteRequest } from 'interfaces/remote.interface';
import { InternalApiRequest } from '@bflint/tools-api';

export class RemoteServerRequest<BodyType> implements RemoteRequest<BodyType> {
  uri: string;
  method: string;
  body: BodyType;
  headers: Record<string, string>;

  constructor(uri: string, method: string, body: BodyType | undefined, headers = {}) {
    this.uri = uri;
    this.method = method;
    this.body = body;
    this.headers = headers;
  }

  static create<BodyType>(req: InternalApiRequest<BodyType, unknown>): RemoteRequest<BodyType> {
    return new RemoteServerRequest(req.remoteUri, req.remoteMethod, req.body, req.remoteHeaders);
  }

  static get(uri: string, headers?: Record<string, string>): RemoteRequest<void> {
    return new RemoteServerRequest(uri, 'GET', undefined, headers);
  }

  static post<T>(uri: string, body: T, headers?: Record<string, string>): RemoteRequest<T> {
    headers = headers ?? {};
    headers['Content-Type'] = 'application/json';

    return new RemoteServerRequest(uri, 'POST', body, headers);
  }

  requestInit(): RequestInit {
    switch (this.method) {
      case 'GET':
        return {
          method: this.method,
          headers: this.headers,
        };
      default:
        return {
          method: this.method,
          body: JSON.stringify(this.body ?? {}),
          headers: this.headers,
        };
    }
  }
}
