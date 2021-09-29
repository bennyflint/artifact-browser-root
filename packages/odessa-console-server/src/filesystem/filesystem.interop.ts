import { InternalApiRequest, ApiResponse } from "../../../tools-api/dist";
import FileSystemInterop from "./filesystem.interface";

export class FileSystemInteropImpl implements FileSystemInterop {

    execute<BodyType, ResponseType, ErrorType>(
            request: InternalApiRequest<void | BodyType, ErrorType>
        ): Promise<ApiResponse<ResponseType, ErrorType>> {

        throw new Error("Method not implemented.");
    }

}