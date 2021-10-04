import * as React from 'react';
import { Box, Chip, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextareaAutosize, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AnimationIcon from '@mui/icons-material/Animation';
import { ArtifactSummary } from 'artifact-browser/services/ArtifactService';
import { Editable } from 'ui-component/Editable';

// Use a type alias here in case we ever want these types to diverge.
type RowProps = ArtifactSummary

function Row(props: { row: RowProps } ) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = React.useState(row.notes)
  
  const editNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.displayName}
        </TableCell>
        <TableCell>{row.created}</TableCell>
        <TableCell>
          <Stack justifyContent="flex-start" direction="row" spacing={1}>{row.labels?.map((label) => {
            return (
                <Chip label={label} size="small" variant="outlined"/>
            );})
          }
          </Stack>
        </TableCell>
        <TableCell align="center"><AnimationIcon /></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Identifier</TableCell>
                    <TableCell>Changes</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.changes}</TableCell>
                    <TableCell>
                      <Editable
                        text={notes}
                        placeholder="Description for the task"
                        type="textarea"
                      >
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            value={notes}
                            onChange={editNotes}
                          />
                        </Box>
                      </Editable>
                    </TableCell>
                  </TableRow>
                </TableBody>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface ArtifactTableProps {
    rows: RowProps[]
}

export const ArtifactTable = (
  {
      rows = [],
      ...others
  }: ArtifactTableProps
  ): React.ReactElement => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Artifact</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Labels</TableCell>
              <TableCell align="right">Launchers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
