import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { FaUserCircle, FaMapMarkerAlt, FaEnvelope, FaGraduationCap } from 'react-icons/fa';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/student/profile');
        setProfile(res.data);
        calculateProfileCompletion(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/jobs');
        const jobsWithMatchScore = res.data.map(job => {
          const companyName = job.employer?.companyName || 'Unknown';
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
      } finally {
        setLoadingJobs(false);
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
    filledFields += basicFields.filter(field => profileData[field]?.trim() !== '').length;

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">🎓 Student Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Student Info */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          {loadingProfile ? (
            <p className="text-gray-500">Loading profile...</p>
          ) : profile ? (
            <>
              <div className="flex items-center gap-4 mb-4">
                <FaUserCircle className="text-5xl text-gray-500" />
                <div>
                  <h2 className="text-xl font-bold">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-gray-600 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-sm" /> {profile.address}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <p className="mb-2"><FaEnvelope className="inline mr-2" /> <strong>Email:</strong> {profile.email}</p>

                {profile.education.length > 0 && (
                  <div className="mb-2">
                    <FaGraduationCap className="inline mr-2" />
                    <strong>Education:</strong> {profile.education[0].degree} at {profile.education[0].institution}
                  </div>
                )}

                <div className="mb-2">
                  <strong>Skills:</strong> {profile.skills.join(', ')}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-md mb-2">Profile Completion</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{profileCompletion}% completed</span>
                  {profileCompletion < 100 && (
                    <Link to="/student/profile" className="text-blue-600 hover:underline">
                      Complete Profile
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-red-500">Could not load student profile.</p>
          )}
        </div>

        {/* RIGHT: Jobs */}
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">🤖 AI-Recommended Jobs</h2>
          {loadingJobs ? (
            <p className="text-gray-500">Loading jobs...</p>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No job recommendations available at this moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
