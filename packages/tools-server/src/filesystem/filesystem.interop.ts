const directoryTree = require("directory-tree");
import { rejects } from "assert";
import { promises } from "fs";
import * as path from 'path';
import { ApiResponse, FileSystemRequestBody } from "@bflint/tools-api";
import FileSystemInterop from "./filesystem.interface";


async function readTheFile(filepath: string) {
    const f = await promises.open(path.normalize(filepath), 'r')
    const contents = await f.readFile("utf8")
    const info = JSON.parse(contents)
    console.log(JSON.stringify(info))
    f.close()
    return info
}

export class FileSystemInteropImpl implements FileSystemInterop {

    async execute<ResponseType, ErrorType>(
            request: FileSystemRequestBody
        ): Promise<ApiResponse<ResponseType, ErrorType>> {     

            const paths: string[] = [];

            // Find all the json files
            const args = {
                extensions: /\.json$/,
                exclude: [/node_modules/,/.git/]}
            directoryTree(request.cwd, args, (_item: any, p: string) => {
                paths.push(p)
            });

            const results = [];

            // Read all the files in parallel
            const promises = paths.map(filepath => readTheFile(filepath));
            for (const p of promises) {
                results.push(await p)
            }

            // FIXME Horrible casting hack
            const x: any = results;
            return {success: true, response: x};

    }

}