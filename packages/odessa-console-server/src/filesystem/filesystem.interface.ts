import { ApiResponse, InternalApiRequest } from '@bflint/tools-api'


interface FileSystemInterop {
  execute<BodyType, ResponseType, ErrorType>(
      request: InternalApiRequest<BodyType | void, ErrorType>
    ): Promise<ApiResponse<ResponseType, ErrorType>>;

}

export default FileSystemInterop;
