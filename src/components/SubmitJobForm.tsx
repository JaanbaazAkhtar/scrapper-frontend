import React, { useState } from 'react';
import { submitJob } from '../api';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface SubmitJobFormProps {
    onJobSubmitted: (jobId: string) => void;
}

const SubmitJobForm: React.FC<SubmitJobFormProps> = ({ onJobSubmitted }) => {
    const [query, setQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!query.trim()) {
            toast.error('Please enter a search query');
            return;
        }

        setIsSubmitting(true);
        try {
            const jobId = await submitJob(query);
            onJobSubmitted(jobId);
            toast.success('Job submitted successfully!');
        } catch (error) {
            console.log(error)
            toast.error('Failed to submit job');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="submit-job-form">
            
            <Typography variant="h6" component="div">
                Submit a Search Query
            </Typography>
            <TextField  
                label="Enter your search query" 
                variant="outlined"
                placeholder="Enter search query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isSubmitting} 
            />
            <Button variant="contained" color="success" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Job'}
            </Button>

        </form>
    );
};

export default SubmitJobForm;
