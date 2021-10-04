import { ApiResponse, FileSystemRequestBody, SimpleApiRequest } from '@bflint/tools-api'


interface FileSystemInterop {
  execute<ResponseType, ErrorType>(
      request: FileSystemRequestBody
    ): Promise<ApiResponse<ResponseType, ErrorType>>;

}

export default FileSystemInterop;
