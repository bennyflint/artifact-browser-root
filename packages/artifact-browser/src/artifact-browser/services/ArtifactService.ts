import { ApiService, SimpleApiRequest, FileSystemApiRequest, FileSystemCommandType, FileSystemRequestBody, ErrorHandler, CliApiRequest } from "@bflint/tools-api"

export interface ArtifactSummary {
    id: string,
    name: string,
    displayName: string,
    org: string,
    module: string,
    version: string,
    integrationRevision: string,
    classifier: string,
    created: string,
    labels?: string[],
    changes?: string,
    notes?: string
}

export class ArtifactService {

    apiService: ApiService;
    dbDir: string = '../../../artifact-browser-db'

    constructor(apiService: ApiService = new ApiService('http://localhost:4000')) {
        this.apiService = apiService;
    }

    async fetchArtifacts(): Promise<ArtifactSummary[]> {
        const req = FileSystemApiRequest.create({cwd: this.dbDir, cmd: FileSystemCommandType.LS_TREE})
        return this.apiService.apiRequest<FileSystemRequestBody, ArtifactSummary[], string>(req)
        .then(data => {
            return data.response || [];
        });
    }

}