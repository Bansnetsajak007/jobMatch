import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const JobApplicationPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://jobmatch-ixrz.onrender.com/api/jobs/${id}`);
        const employerProfileRes = await axios.get(
          `https://jobmatch-ixrz.onrender.com/api/employer/profile/${res.data.employer._id}`
        );
        setJob({
          ...res.data,
          companyName: employerProfileRes.data.companyName || 'Unknown',
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        setError('Failed to load job details. Please try again.');
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!resumeText.trim() || !coverLetterText.trim()) {
        setError('Please fill in both the resume and cover letter.');
        return;
      }

      const payload = {
        resume: resumeText,
        coverLetter: coverLetterText,
      };

      await axios.post(`https://jobmatch-ixrz.onrender.com/api/jobs/${id}/apply`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess('Application submitted successfully!');
      setError('');
      setTimeout(() => navigate('/student/dashboard'), 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setError(error.response?.data?.message || 'Failed to submit application. Please try again.');
      setSuccess('');
    }
  };

  if (error && !job) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <Link to="/student/dashboard" className="text-secondary hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!job) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">JobMatch</h1>
        <Link to="/student/dashboard" className="text-secondary hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
          <p className="text-gray-600 mb-2">{job.companyName} — {job.location}</p>
          <p className="text-gray-600 mb-4">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>

          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-600 mb-4">{job.description}</p>

          <h3 className="text-lg font-semibold mb-2">Salary</h3>
          <p className="text-gray-600 mb-4">{job.salary || 'Not specified'}</p>

          <h3 className="text-lg font-semibold mb-2">Employer Overview</h3>
          <p className="text-gray-600">{job.companyName} is a leading organization based in {job.location}.</p>
        </div>

        {/* Application Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Submit Your Application</h2>

          {success && <p className="text-green-500 mb-4">{success}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="resumeText" className="block text-gray-700">Resume (Text):</label>
              <textarea
                id="resumeText"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-2 border rounded"
                rows={5}
                placeholder="Paste your resume here..."
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="coverLetterText" className="block text-gray-700">Cover Letter (Text):</label>
              <textarea
                id="coverLetterText"
                value={coverLetterText}
                onChange={(e) => setCoverLetterText(e.target.value)}
                className="w-full p-2 border rounded"
                rows={5}
                placeholder="Paste your cover letter here..."
                required
              />
            </div>

            <Button type="submit" className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">
              Apply
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;
