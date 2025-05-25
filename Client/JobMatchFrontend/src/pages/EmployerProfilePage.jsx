import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const EmployerProfilePage = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    companyDescription: '',
    website: '',
    location: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://jobmatch-ixrz.onrender.com/api/employer/profile');
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://jobmatch-ixrz.onrender.com/api/employer/profile', profile);
      alert('Profile updated successfully!');
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-primary mb-6">Complete Your Employer Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={profile.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Company Description</label>
            <textarea
              name="companyDescription"
              value={profile.companyDescription}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={profile.website}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md"
          >
            Save Profile
          </Button>
        </form>

        {/* Right: Info Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📘 Company Overview</h2>
              <p className="text-gray-600 mb-4">
                This panel gives you a quick glance at your company profile. Ensure your information is accurate and engaging for potential job seekers.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>🏢 <strong>Name:</strong> {profile.companyName || 'Not Provided'}</li>
                <li>🌐 <strong>Website:</strong> {profile.website || 'Not Provided'}</li>
                <li>📍 <strong>Location:</strong> {profile.location || 'Not Provided'}</li>
              </ul>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              Tip: A well-written description can boost candidate engagement!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;
