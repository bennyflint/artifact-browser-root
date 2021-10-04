import { SimpleApiRequest, ErrorHandler } from './interfaces';

export enum FileSystemCommandType {
    LS_TREE = 0
}

export interface FileSystemRequestBody {
    cwd: string,
    cmd: FileSystemCommandType
}

export class FileSystemApiRequest<ErrorType> implements SimpleApiRequest<FileSystemRequestBody, ErrorType>{
    FILESYSTEM_API_URI = '/api/filesystem';

    path: string;
    body: FileSystemRequestBody;
    errorHandler?: ErrorHandler<ErrorType> | undefined;

    constructor(body: FileSystemRequestBody, errorHandler: ErrorHandler<ErrorType> | undefined) {
        this.path = this.FILESYSTEM_API_URI
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

    static create(body: FileSystemRequestBody): FileSystemApiRequest<string> {
        // This undefined will come back to bite me.
        return new FileSystemApiRequest(body, undefined)
    }
    
}

