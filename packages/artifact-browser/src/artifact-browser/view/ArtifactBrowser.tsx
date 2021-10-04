import React, { useEffect } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { ArtifactTable } from 'artifact-browser/view/ArtifactTable'
import { ArtifactService, ArtifactSummary } from 'artifact-browser/services/ArtifactService';

//= =============================|| SAMPLE PAGE ||==============================//

const ArtifactBrowser = () => {
    const artifactService = new ArtifactService();
    const [artifacts, setArtifacts] = React.useState<ArtifactSummary[]>([]);

    // Fetch artifacts from the file system using local server.
    useEffect(() => {
        artifactService.fetchArtifacts()
        .then(data => {
            setArtifacts(data)
        })
    }, [])
    return(
        <MainCard title="Artifact Browser">
            <Typography component={'span'} variant="body2">
                <ArtifactTable rows={artifacts}/>
            </Typography>
        </MainCard>
    )
};

export default ArtifactBrowser;
