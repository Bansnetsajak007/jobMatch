import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const EmployerDashboard = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobs, setJobs] = useState([]);
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
      const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/jobs');
      const employerJobs = res.data.filter(job => job.employer._id === localStorage.getItem('userId'));
      setJobs(employerJobs);
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Employer Dashboard - {companyName}
        </h1>
        <Link to="/" className="text-secondary hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow">
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
            <Button
              type="submit"
              className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"
            >
              Post Job
            </Button>
          </form>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Matched Candidates</h2>
            <p className="font-semibold">ABI SHRESTHA — MATCH SCORE: 92%</p>
            <p className="text-gray-600">Skills: React, Node.js, AWS</p>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">📊 Applications Per Job</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-500">No job data available for chart.</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={jobs.map(job => ({
                    title: job.title,
                    applications: job.applications.length
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Posted Jobs Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Posted Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-600">Applicants: {job.applications.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
