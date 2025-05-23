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
        const res = await axios.get('http://localhost:3000/api/employer/profile');
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
      await axios.post('http://localhost:3000/api/employer/profile', profile);
      alert('Profile updated successfully!');
      navigate('/employer/dashboard');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Complete Your Employer Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Company Name</label>
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
          <label className="block text-gray-700">Company Description</label>
          <textarea
            name="companyDescription"
            value={profile.companyDescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Website</label>
          <input
            type="text"
            name="website"
            value={profile.website}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <Button type="submit" className="w-full bg-gray-900 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md">Save Profile</Button>
      </form>
    </div>
  );
};

export default EmployerProfilePage;