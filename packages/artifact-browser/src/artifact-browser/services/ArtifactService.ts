import { ApiService } from "@bflint/tools-api"

export interface ArtifactSummary {
    version: string,
    created: string,
    labels?: string[]
}

export class ArtifactService {

    apiService: ApiService;

    constructor(apiService: ApiService = new ApiService('localhost:4000')) {
        this.apiService = apiService;
    }

    fetchArtifacts(): ArtifactSummary[] {
        return [
            this.createData('TheGame.1.0.4.1200.debug', '2021-09-16T14:04', ['Broken']),
            this.createData('TheGame.1.0.4.1200.release', '2021-09-16T14:03', ['Broken']),
        ]
    }

    createData (
        version: string,
        created: string,
        labels: string[]
    ): ArtifactSummary {
        return {
            version,
            created,
            labels,
        };
    }

}