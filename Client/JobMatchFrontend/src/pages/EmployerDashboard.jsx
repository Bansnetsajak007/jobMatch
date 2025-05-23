
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const EmployerDashboard = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobs, setJobs] = useState([]); // Add state for jobs
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployerProfile = async () => {
      try {
        const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/employer/profile');
        setCompanyName(res.data.companyName || 'Unknown');
      } catch (error) {
        console.error('Error fetching employer profile:', error);
        setCompanyName('Unknown');
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/jobs');
        // Filter jobs posted by this employer
        const employerJobs = res.data.filter(job => job.employer._id === localStorage.getItem('userId'));
        setJobs(employerJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchEmployerProfile();
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://jobmatch-ixrz.onrender.com/api/jobs', {
        title,
        location,
        description,
        salary,
      });
      alert('Job posted successfully!');
      setTitle('');
      setLocation('');
      setDescription('');
      setSalary('');
      // Refresh the jobs list
      const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/jobs');
      const employerJobs = res.data.filter(job => job.employer._id === localStorage.getItem('userId'));
      setJobs(employerJobs);
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Employer Dashboard - {companyName}
        </h1>
        <Link to="/" className="text-secondary hover:underline">
          ← Back to Home
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Job Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Salary:</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <Button type="submit" className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">Post Job</Button>
        </form>
      </div>
      <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {jobs.map(job => (
          <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-600">Applicants: {job.applications.length}</p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-4">Matched Candidates</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p className="font-semibold">ABI SHRESTHA — MATCH SCORE: 92%</p>
        <p className="text-gray-600">Skills: React, Node.js, AWS</p>
      </div>
    </div>
  );
};

export default EmployerDashboard;