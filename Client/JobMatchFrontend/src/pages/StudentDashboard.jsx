import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../components/JobCard';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/student/profile');
        setProfile(res.data);
        calculateProfileCompletion(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/jobs');
        console.log('Jobs response:', res.data); // Debug log to inspect the response
        const jobsWithMatchScore = res.data.map(job => {
          const companyName = job.employer && job.employer.companyName ? job.employer.companyName : 'Unknown';
          return {
            ...job,
            company: companyName,
            matchScore: Math.floor(Math.random() * 20) + 80,
            id: job._id,
          };
        });
        setJobs(jobsWithMatchScore);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchProfile();
    fetchJobs();
  }, []);

  const calculateProfileCompletion = (profileData) => {
    let totalFields = 0;
    let filledFields = 0;

    const basicFields = ['firstName', 'lastName', 'address'];
    totalFields += basicFields.length;
    filledFields += basicFields.filter(field => profileData[field] && profileData[field].trim() !== '').length;

    totalFields += profileData.education.length * 4;
    profileData.education.forEach(edu => {
      if (edu.institution) filledFields++;
      if (edu.degree) filledFields++;
      if (edu.startDate) filledFields++;
      if (edu.endDate) filledFields++;
    });

    totalFields += profileData.experience.length * 5;
    profileData.experience.forEach(exp => {
      if (exp.company) filledFields++;
      if (exp.role) filledFields++;
      if (exp.startDate) filledFields++;
      if (exp.endDate) filledFields++;
      if (exp.description) filledFields++;
    });

    totalFields += 1;
    if (profileData.skills.length > 0) filledFields++;

    totalFields += 1;
    if (profileData.resume) filledFields++;

    const percentage = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    setProfileCompletion(percentage);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">JobMatch Student Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Profile Completion</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-secondary h-4 rounded-full"
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mt-2">
          Your profile is {profileCompletion}% complete.{' '}
          {profileCompletion < 100 && (
            <Link to="/student/profile" className="text-secondary hover:underline">
              Complete your profile
            </Link>
          )}
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4">AI-Recommended Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;