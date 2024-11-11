import React, { useState, useEffect } from 'react';
import { getJobStatus } from '../api';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface JobStatusProps {
  jobId: string;
}

const JobStatus: React.FC<JobStatusProps> = ({ jobId }) => {
  const [status, setStatus] = useState('Pending');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusData = await getJobStatus(jobId);
        setStatus(statusData.status);
        if (statusData.status === 'Completed') {
          setResults(statusData.results);
        } else if (statusData.status === 'Failed') {
          setError(statusData.error);
        }
      } catch (error) {
        console.log(error)
        setError('Failed to fetch job status');
      }
    };

    const interval = setInterval(fetchStatus, 30000);

    return () => clearInterval(interval);
  }, [jobId]);

  return (
    <div className="job-status">
      <Typography variant="h6" component="div">
        Job Status: {status}
      </Typography>
      {status === 'Completed' && (
        <div>
          <h4>Scraped Tweets:</h4>
          <div className="card-container">
            {results.map((tweet, index) => (
              <Card  key={index}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {tweet.username}{tweet.username}
                  </Typography>
                  <Typography variant="body2">
                    {tweet.content}
                  </Typography>
                </CardContent>
              </Card>
              
            ))}
          </div>

        </div>
      )}
      {status === 'Failed' && error && <p className="error">{error}</p>}
    </div>
  );
};

export default JobStatus;
