import React, { useState } from 'react';
import SubmitJobForm from './components/SubmitJobForm';
import JobStatus from './components/JobStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    })
    : null;
}


const App: React.FC = () => {
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <>
      <div className='app'>
        <CssBaseline />
        <ElevationScroll>
          <AppBar>
            <Toolbar>
              <Typography variant="h5" component="div">
                Twitter Scraper
              </Typography>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box sx={{ my: 2 }}>
            {!jobId ? (
              <SubmitJobForm onJobSubmitted={setJobId} />
            ) : (
              <JobStatus jobId={jobId} />
            )}
            <ToastContainer />
          </Box>
        </Container>
      </div>
    </>
  );
};

export default App;
