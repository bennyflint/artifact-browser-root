import React from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { ArtifactTable } from 'artifact-browser/view/ArtifactTable'
import { ArtifactService } from 'artifact-browser/services/ArtifactService';

//= =============================|| SAMPLE PAGE ||==============================//

const ArtifactBrowser = () => {
    const artifactService = new ArtifactService();

    const [artifacts, setArtifacts] = React.useState(() => {
        return artifactService.fetchArtifacts()
    });

    return(
        <MainCard title="Artifact Browser">
            <Typography variant="body2">
                <ArtifactTable rows={artifacts} />
            </Typography>
        </MainCard>
    )
};

export default ArtifactBrowser;
