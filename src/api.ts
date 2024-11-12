import axios from 'axios';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const API_URL = 'http://localhost:3000/jobs';

export const submitJob = async (query: string) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, { query });
    return response.data; // Returns the job ID
  } catch (error) {
    console.log(error)
    throw new Error('Failed to submit job');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getJobStatus = async (jobId: any) => {
  try {
    const JobsId = jobId.jobId
    console.log('jobId is ', JobsId)
    const response = await axios.get(`${API_URL}/status/${JobsId}`);
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error('Failed to fetch job status');
  }
};
