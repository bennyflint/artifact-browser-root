import { ApiResponse } from '@bflint/tools-api';

export interface RemoteRequest<BodyType> {
  uri: string;
  method: string;
  body: BodyType;
  requestInit(): RequestInit;
}

export interface RemoteInterop {
  execute<BodyType, ResponseType, ErrorType>(
    request: RemoteRequest<BodyType | void>,
  ): Promise<ApiResponse<ResponseType, ErrorType>>;
}
